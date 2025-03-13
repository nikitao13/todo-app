package spring.todo.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.todo.Category.Category;
import spring.todo.Category.CategoryService;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryService categoryService;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task createTask(TaskRequestDTO taskRequest) {
        Category category = categoryService.getCategoryById(taskRequest.getCategoryId());
    
        Task newTask = new Task();
        newTask.setTaskName(taskRequest.getTaskName());
        newTask.setCompleted(Boolean.TRUE.equals(taskRequest.getCompleted()));
        newTask.setCategory(category);

        String priority = taskRequest.getPriority();
        if (priority == null) {
            priority = "LOW";
        }
        newTask.setPriority(priority.toUpperCase());
    
        return taskRepository.save(newTask);
    }

    public Task updateTask(Long id, TaskRequestDTO taskRequest) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        if (existingTask == null) {
            return null;
        }
    
        if (taskRequest.getTaskName() != null) {
            existingTask.setTaskName(taskRequest.getTaskName());
        }
    
        if (taskRequest.getCompleted() != null) {
            existingTask.setCompleted(Boolean.TRUE.equals(taskRequest.getCompleted()));
        }
    
        if (taskRequest.getCategoryId() != null) {
            Category category = categoryService.getCategoryById(taskRequest.getCategoryId());
            existingTask.setCategory(category);
        }
    
        if (taskRequest.getPriority() != null) {
            existingTask.setPriority(taskRequest.getPriority().toUpperCase());
        }
    
        return taskRepository.save(existingTask);
    }
    

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
