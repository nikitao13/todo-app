package spring.todo.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.todo.exceptions.ResourceNotFoundException;
import spring.todo.exceptions.DuplicateTaskException;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new DuplicateTaskException("Category name '" + category.getName() + "' already exists.");
        }
        return categoryRepository.save(category);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
