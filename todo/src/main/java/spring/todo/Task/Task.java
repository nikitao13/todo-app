package spring.todo.Task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import spring.todo.Category.Category;

// Represents the Task entity and maps to the "tasks" database table
// Each Task belongs to one Category (many-to-one)

@Entity
@Table(name = "tasks")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long taskId;
  
  @Column(unique = true)
  private String taskName;

  private Boolean completed;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonIgnoreProperties("tasks") 
  private Category category;

  public Task() {}

  public Task(String taskName, boolean completed) {
    this.taskName = taskName;
    this.completed = completed;
  }

  public Long getTaskId() { return taskId; }
  public String getTaskName() { return taskName; }
  public boolean isCompleted() { return completed; }
  public Category getCategory() { return category; }

  public void setTaskName(String taskName) { this.taskName = taskName; }
  public void setCompleted(boolean completed) { this.completed = completed; }
  public void setCategory(Category category) { this.category = category; }
}
