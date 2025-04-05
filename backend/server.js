import express from "express";
import cors from "cors";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

const extractText = (property) => {
  if (!property) return "";

  if (
    property.title &&
    Array.isArray(property.title) &&
    property.title.length > 0
  ) {
    return property.title[0]?.plain_text || "";
  }

  if (
    property.rich_text &&
    Array.isArray(property.rich_text) &&
    property.rich_text.length > 0
  ) {
    return property.rich_text[0]?.plain_text || "";
  }

  return "";
};

const extractFileUrl = (property) => {
  if (!property || !property.files || property.files.length === 0) return "";

  const file = property.files[0];
  return file.file?.url || file.external?.url || "";
};

const extractMultiSelect = (property) => {
  if (!property || !property.multi_select) return [];
  return property.multi_select.map((item) => item.name);
};

// Routes
app.get("/api/projects", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    if (response.results.length > 0) {
      console.log(
        "First page properties:",
        Object.keys(response.results[0].properties),
      );
    }

    const projects = response.results.map((page) => {
      return {
        id: page.id,
        title:
          extractText(page.properties?.Name) ||
          extractText(page.properties?.Title) ||
          "Untitled",
        subtitle: extractText(page.properties?.Subtitle),
        description: extractText(page.properties?.Description),
        image: extractFileUrl(page.properties?.Image),
      };
    });

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects from Notion:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get project details by ID
app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const page = await notion.pages.retrieve({
      page_id: id,
    });

    const blocks = await notion.blocks.children.list({
      block_id: id,
    });

    const project = {
      id: page.id,
      title:
        extractText(page.properties.Title) ||
        extractText(page.properties.Name) ||
        "Untitled",
      subtitle: extractText(page.properties.Subtitle),
      description: extractText(page.properties.Description),
      image: extractFileUrl(page.properties.Image),
      logo: extractFileUrl(page.properties.Logo),
      role: extractMultiSelect(page.properties.Role),
      responsibility: extractMultiSelect(page.properties.Responsibility),
      team: extractMultiSelect(page.properties.Team),
      problem: "",
    };

    const problemBlock = blocks.results.find(
      (block) =>
        block.type === "heading_2" &&
        block.heading_2?.rich_text?.[0]?.plain_text === "Problem",
    );

    if (problemBlock) {
      const problemIndex = blocks.results.indexOf(problemBlock);
      const nextHeadingIndex = blocks.results.findIndex(
        (block, index) =>
          index > problemIndex &&
          (block.type === "heading_2" || block.type === "heading_1"),
      );

      const problemContent = blocks.results
        .slice(
          problemIndex + 1,
          nextHeadingIndex > -1 ? nextHeadingIndex : undefined,
        )
        .filter((block) => block.type === "paragraph")
        .map((block) => {
          if (block.paragraph?.rich_text?.length > 0) {
            return block.paragraph.rich_text
              .map((text) => text.plain_text || "")
              .join("");
          }
          return "";
        })
        .filter((text) => text !== "")
        .join("\n\n");

      project.problem = problemContent;
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project from Notion:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to fetch project details" });
  }
});

// Get about page content
app.get("/api/about-content", async (req, res) => {
  try {
    const approachResponse = await notion.databases.query({
      database_id: process.env.NOTION_APPROACH_DB_ID,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    // Fetch experience items from Notion
    const experienceResponse = await notion.databases.query({
      database_id: process.env.NOTION_EXPERIENCE_DB_ID,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    // Parse approach data
    const approach = approachResponse.results.map((page) => {
      return {
        id: page.id,
        title: page.properties.Title?.title[0]?.plain_text || "Untitled",
        description:
          page.properties.Description?.rich_text[0]?.plain_text || "",
      };
    });

    // Parse experience data
    const experience = experienceResponse.results.map((page) => {
      return {
        id: page.id,
        title: page.properties.Title?.title[0]?.plain_text || "Untitled",
        company: page.properties.Company?.rich_text[0]?.plain_text || "",
        logo:
          page.properties.Logo?.files[0]?.file?.url ||
          page.properties.Logo?.files[0]?.external?.url ||
          "",
        duration: page.properties.Duration?.rich_text[0]?.plain_text || "",
      };
    });

    // Return the combined data
    res.json({
      approach,
      experience,
    });
  } catch (error) {
    console.error("Error fetching about content from Notion:", error);
    res.status(500).json({ error: "Failed to fetch about page content" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
