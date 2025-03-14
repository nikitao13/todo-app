package spring.todo.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.todo.Category.Category;
import spring.todo.Category.CategoryService;
import java.util.List;

import spring.todo.exceptions.DuplicateTaskException;
import spring.todo.exceptions.ResourceNotFoundException;

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
        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    public Task createTask(TaskRequestDTO taskRequest) {
        if (taskRepository.existsByTaskNameIgnoreCase(taskRequest.getTaskName())) {
            throw new DuplicateTaskException("Task name '" + taskRequest.getTaskName() + "' already exists.");
        }

        Category category = categoryService.getCategoryById(taskRequest.getCategoryId());
    
        Task newTask = new Task();
        newTask.setTaskName(taskRequest.getTaskName());
        newTask.setCompleted(Boolean.TRUE.equals(taskRequest.getCompleted()));
        newTask.setCategory(category);
        newTask.setPriority(taskRequest.getPriority() != null ? taskRequest.getPriority().toUpperCase() : "LOW");

        return taskRepository.save(newTask);
    }

    public Task updateTask(Long id, TaskRequestDTO taskRequest) {
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        
        if (taskRequest.getTaskName() != null && !taskRequest.getTaskName().equals(existingTask.getTaskName())) {
            if (taskRepository.existsByTaskNameIgnoreCase(taskRequest.getTaskName())) {
                throw new DuplicateTaskException("Task name '" + taskRequest.getTaskName() + "' already exists.");
            }
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
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task with ID " + id + " not found.");
        }
        taskRepository.deleteById(id);
    }
}
