package spring.todo.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import spring.todo.Category.Category;
import spring.todo.Category.CategoryRepository;

import java.util.Arrays;

@Component
public class TaskSeeder implements CommandLineRunner {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {

        Category backendCategory = new Category("Back-end");
        Category frontendCategory = new Category("Front-end");
        Category fullStackCategory = new Category("Full-Stack");
        Category homeworkCategory = new Category("Homework");

        categoryRepository.saveAll(Arrays.asList(backendCategory, frontendCategory, fullStackCategory, homeworkCategory));

        Task task1 = new Task("Setup API routes", true);
        task1.setCategory(backendCategory);

        Task task2 = new Task("Create frontend", false);
        task2.setCategory(frontendCategory);

        Task task3 = new Task("Connect frontend to backend", false);
        task3.setCategory(fullStackCategory);

        Task task4 = new Task("Codewars", false);
        task4.setCategory(homeworkCategory);

        taskRepository.saveAll(Arrays.asList(task1, task2, task3, task4));
    }
}
