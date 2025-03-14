package spring.todo.Task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
  boolean existsByTaskNameIgnoreCase(String taskName);
}
