import { FormEvent, InvalidEvent, useState } from "react";
import styles from "./App.module.css";
import { ClipboardText, PlusCircle } from "phosphor-react";
import { TaskItem } from "./components/TaskItem";
import { v4 as uuidv4 } from "uuid";

import "./global.css";
import { Header } from "./components/Header";

function App() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [countCompleteTasks, setCountCompleteTasks] = useState<number>(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTaskList([
      ...taskList,
      { id: uuidv4(), isComplete: false, title: inputValue },
    ]);
    setInputValue("");
  }

  function handleInputValueInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  function handleChangeIsComplete(id: string) {
    const newTaskList = taskList.map((task) => {
      if (id === task.id) task.isComplete = !task.isComplete;
      return task;
    });

    const countComplete = newTaskList.filter(
      (task) => task.isComplete === true
    ).length;

    setTaskList(newTaskList);
    setCountCompleteTasks(countComplete);
  }

  function handleDeleteTaskItem(id: string) {
    const newTaskList = taskList.filter((task) => task.id != id);

    const countComplete = newTaskList.filter(
      (task) => task.isComplete === true
    ).length;

    setTaskList(newTaskList);
    setCountCompleteTasks(countComplete);
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <form className={styles.main_form} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            className={styles.input_task}
            onInvalid={handleInputValueInvalid}
            onChange={(evt) => setInputValue(evt.target.value)}
            value={inputValue}
            required
            autoFocus
          />
          <button className={styles.button_create}>
            Criar <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.main_counts}>
          <p>
            Tarefas criadas <span>{taskList.length}</span>
          </p>
          <p>
            Concluídas{" "}
            <span>
              {countCompleteTasks === 0
                ? countCompleteTasks
                : `${countCompleteTasks} de ${taskList.length}`}
            </span>
          </p>
        </div>

        {taskList.length > 0 ? (
          <div className={styles.main_taskList}>
            {taskList.map(({ id, isComplete, title }) => (
              <TaskItem
                key={id}
                id={id}
                isComplete={isComplete}
                title={title}
                onChangeIsComplete={handleChangeIsComplete}
                onDeleteTaskItem={handleDeleteTaskItem}
              />
            ))}
          </div>
        ) : (
          <div className={styles.main_empty}>
            <ClipboardText
              className={styles.main_empty_icon}
              size={66}
              weight="thin"
            />
            <p className={styles.main_empty_title}>
              Você ainda não tem tarefas cadastradas
            </p>
            <p className={styles.main_empty_description}>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
