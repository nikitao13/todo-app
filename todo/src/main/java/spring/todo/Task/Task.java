package spring.todo.Task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import spring.todo.Category.Category;

@Entity
@Table(name = "tasks")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long taskId;
  
  @Column(unique = true)
  private String taskName;

  private Boolean completed;

  @Column(nullable = false)
  private String priority;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonIgnoreProperties("tasks") 
  private Category category;


  public Task() {}

  public Task(String taskName, boolean completed, String priority) {
    this.taskName = taskName;
    this.completed = completed;
    this.priority = priority;
  }

  public Long getTaskId() { 
    return taskId; 
  }

  public String getTaskName() { 
    return capitalizeFirstLetter(taskName); 
  }

  public boolean isCompleted() { 
    return completed; 
  }

  public Category getCategory() { 
    return category; 
  }

  public String getPriority() { 
    return priority; 
  }

  public void setTaskName(String taskName) { 
    this.taskName = taskName; 
  }

  public void setCompleted(boolean completed) { 
    this.completed = completed; 
  }

  public void setCategory(Category category) { 
    this.category = category; 
  }

  public void setPriority(String priority) { 
    this.priority = priority; 
  }

  private String capitalizeFirstLetter(String text) {
    if (text == null || text.isEmpty()) {
        return text;
    }
    return Character.toUpperCase(text.charAt(0)) + text.substring(1);
  }
}
