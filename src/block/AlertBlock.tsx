import { BlockNoteEditor } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { TriangleAlert } from "lucide-react";

export const AlertBlock = createReactBlockSpec({
    type: "alert",
    propSchema: {
        variant: {
            default: "warning",
            values: ['info', "warning", "error"]
        }
    },
    content: "inline"
}, {
    render: (props) => {
        return (
            <div className="flex items-center gap-3 my-2 px-4 h-20 bg-[#313131] text-white rounded w-full">
                <span><TriangleAlert/></span>
                <div className="font-bold" ref={props.contentRef}/>
            </div>
        )
    }
});

export const insertAlert = (editor: BlockNoteEditor) => ({
  title: "Alerte",
  subtext: "Insérée un alerte",
  aliases: ["warning", "attention", "alerte"],
  group: "Jotion",
  icon: <TriangleAlert/>,
  onItemClick: () => {
    editor.insertBlocks(
      [
        {
          type: "alert" as any,
        },
      ],
      editor.getTextCursorPosition().block,
      "before"
    );
  },
});
