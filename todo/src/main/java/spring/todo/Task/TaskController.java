package spring.todo.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.todo.Category.Category;
import spring.todo.Category.CategoryService; 

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public Task createTask(@RequestBody TaskRequestDTO taskRequest) {
        Category category = null;

        if (taskRequest.getCategoryId() != null) {
            category = categoryService.getCategoryById(taskRequest.getCategoryId());
        }

        Task newTask = new Task();
        newTask.setTaskName(taskRequest.getTaskName());
        newTask.setCompleted(Boolean.TRUE.equals(taskRequest.getCompleted()));
        newTask.setCategory(category);

        return taskService.createTask(newTask);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody TaskRequestDTO taskRequest) {
        Category category = null;
        if (taskRequest.getCategoryId() != null) {
            category = categoryService.getCategoryById(taskRequest.getCategoryId());
        }

        Task existingTask = taskService.getTaskById(id);
        if (existingTask == null) {
            return null;
        }

        existingTask.setTaskName(taskRequest.getTaskName());
        existingTask.setCompleted(Boolean.TRUE.equals(taskRequest.getCompleted()));
        existingTask.setCategory(category);

        return taskService.updateTask(id, existingTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
