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

        Task task1 = new Task("setup API routes", true, "HIGH");
        task1.setCategory(backendCategory);

        Task task2 = new Task("create frontend", false, "HIGH");
        task2.setCategory(frontendCategory);

        Task task3 = new Task("connect frontend to backend", false, "MEDIUM");
        task3.setCategory(fullStackCategory);

        Task task4 = new Task("codewars", false, "LOW");
        task4.setCategory(homeworkCategory);

        taskRepository.saveAll(Arrays.asList(task1, task2, task3, task4));
    }
}
