import React from "react";
import { useDroppable } from "@dnd-kit/core";

import IssueCard from "./IssueCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const Droppable = (props) => {
  const { id, items } = props;
  const { setNodeRef } = useDroppable({
    id
  })

  return(
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>
        {items.map((id) => (
          <SortableContext key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  )
}

export default Droppable