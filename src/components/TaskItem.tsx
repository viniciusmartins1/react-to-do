import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { Trash } from "phosphor-react";
import { useState } from "react";
import styles from "./TaskItem.module.css";

export type TaskItem = {
  id: string;
  isComplete: boolean;
  title: string;
};

interface TaskItemProps {
  id: string;
  isComplete: boolean;
  title: string;
  onChangeIsComplete: (id: string) => void;
  onDeleteTaskItem: (id: string) => void;
}

export function TaskItem({
  id,
  title,
  isComplete,
  onChangeIsComplete,
  onDeleteTaskItem,
}: TaskItemProps) {
  function handleCheckBoxChange() {
    if (onChangeIsComplete) {
      onChangeIsComplete(id);
    }
  }

  function handleDeleteTaskItem() {
    if (onDeleteTaskItem) {
      onDeleteTaskItem(id);
    }
  }

  return (
    <div className={styles.main_task_list}>
      <div>
        <Checkbox
          icon={<CircleOutlined style={{ color: "#4ea8de" }} />}
          checkedIcon={
            <CheckCircle
              style={{
                color: "#5e60ce",
                padding: 0,
                borderRadius: "50%",
                border: "none",
              }}
            />
          }
          onChange={handleCheckBoxChange}
          checked={isComplete}
          size="small"
          style={{
            padding: 0,
          }}
        />
      </div>
      <p className={isComplete ? styles.isComplete : ""}>{title}</p>
      <Trash
        onClick={handleDeleteTaskItem}
        size={19}
        weight="thin"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
