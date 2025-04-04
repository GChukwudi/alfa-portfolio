import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

export const fetchProjects = async () => {
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

    return response.results.map((page) => {
      return {
        id: page.id,
        title: page.properties.Title?.title[0]?.plain_text || "Untitled",
        subtitle: page.properties.Subtitle?.rich_text[0]?.plain_text || "",
        description:
          page.properties.Description?.rich_text[0]?.plain_text || "",
        image:
          page.properties.Image?.files[0]?.file?.url ||
          page.properties.Image?.files[0]?.external?.url ||
          "",
      };
    });
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    throw error;
  }
};

export const fetchProjectById = async (pageId) => {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });

    // Get page content (blocks)
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    const project = {
      id: response.id,
      title: response.properties.Title?.title[0]?.plain_text || "Untitled",
      subtitle: response.properties.Subtitle?.rich_text[0]?.plain_text || "",
      description:
        response.properties.Description?.rich_text[0]?.plain_text || "",
      image:
        response.properties.Image?.files[0]?.file?.url ||
        response.properties.Image?.files[0]?.external?.url ||
        "",
      logo:
        response.properties.Logo?.files[0]?.file?.url ||
        response.properties.Logo?.files[0]?.external?.url ||
        "",
      role:
        response.properties.Role?.multi_select.map((item) => item.name) || [],
      responsibility:
        response.properties.Responsibility?.multi_select.map(
          (item) => item.name,
        ) || [],
      team:
        response.properties.Team?.multi_select.map((item) => item.name) || [],
      problem: "",
    };

    const problemBlock = blocks.results.find(
      (block) =>
        block.type === "heading_2" &&
        block.heading_2?.rich_text[0]?.plain_text === "Problem",
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
          if (block.paragraph.rich_text.length > 0) {
            return block.paragraph.rich_text
              .map((text) => text.plain_text)
              .join("");
          }
          return "";
        })
        .filter((text) => text !== "")
        .join("\n\n");

      project.problem = problemContent;
    }

    return project;
  } catch (error) {
    console.error("Error fetching project from Notion:", error);
    throw error;
  }
};
