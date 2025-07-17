# Design Document: Interactive Learning Experience Generator

## Overview

The Interactive Learning Experience Generator is an AI-powered application that transforms educational content into engaging, interactive learning experiences. The system processes user inputs (topics or research papers) and generates personalized learning content with interactive elements such as quizzes, polls, and reordering exercises based on user preferences.

This design document outlines the architecture, components, data models, and other technical aspects of the application to fulfill the requirements specified in the requirements document.

## Architecture

The application follows a modern, scalable architecture with clear separation of concerns:

```mermaid
graph TD
    Client[Client Application] <--> API[API Layer]
    API <--> Auth[Authentication Service]
    API <--> ContentGen[Content Generation Service]
    API <--> UserMgmt[User Management Service]
    API <--> Storage[Content Storage Service]
    
    ContentGen <--> AIEngine[AI Engine]
    ContentGen <--> InteractiveGen[Interactive Elements Generator]
    ContentGen <--> ContentAnalyzer[Content Analyzer]
    
    Storage <--> Database[(Database)]
    Storage <--> FileStore[(File Storage)]
    
    subgraph External Services
        AIEngine <--> ExternalAI[External AI Services]
        ContentAnalyzer <--> ResearchDB[Research Databases]
    end
```

### Key Architectural Components:

1. **Client Application**: A responsive React/TypeScript web application providing the user interface.
2. **API Layer**: Spring Boot RESTful API endpoints handling client requests and orchestrating backend services.
3. **Authentication Service**: Manages user authentication and authorization using Spring Security.
4. **Content Generation Service**: Core service responsible for generating learning content.
5. **User Management Service**: Handles user account operations and preference management.
6. **Content Storage Service**: Manages persistence of generated content and user data in PostgreSQL.
7. **AI Engine**: Interfaces with AI models for content generation and enhancement.
8. **Interactive Elements Generator**: Creates interactive learning components.
9. **Content Analyzer**: Processes and analyzes input files and topics.

## SOLID-Based Domain Models

The application follows SOLID principles in its domain model design:

1. **Single Responsibility Principle**: Each model has a single responsibility
2. **Open/Closed Principle**: Models are open for extension but closed for modification
3. **Liskov Substitution Principle**: Subtypes can be substituted for their base types
4. **Interface Segregation Principle**: Clients depend only on interfaces they use
5. **Dependency Inversion Principle**: High-level modules depend on abstractions

### Base Models and Interfaces

```java
// Common enums
public enum ComplexityLevel {
    BEGINNER, INTERMEDIATE, ADVANCED
}

public enum KnowledgeLevel {
    NONE, BASIC, INTERMEDIATE, ADVANCED
}

// Base entity interface with common properties
public interface Entity {
    Long getId();
    LocalDateTime getCreatedAt();
    LocalDateTime getUpdatedAt();
}

// Base metadata class
@Embeddable
public class Metadata {
    private String tags;
    private ComplexityLevel complexity;
    private Integer estimatedDuration;
    
    // Getters and setters
}

// Base content element interface
public interface ContentElement extends Entity {
    String getType();
    Integer getOrder();
    Metadata getMetadata();
}

// Base container interface
public interface ContentContainer extends Entity {
    String getTitle();
    String getDescription();
    Metadata getMetadata();
}

// User progress tracking interface
public interface ProgressTrackable {
    Progress getUserProgress(Long userId);
    void updateUserProgress(Long userId, Progress progress);
}

// Learning preferences class
@Embeddable
public class LearningPreferences {
    @Enumerated(EnumType.STRING)
    private Duration duration;
    
    @Enumerated(EnumType.STRING)
    private Focus focus;
    
    @Enumerated(EnumType.STRING)
    private ComplexityLevel difficulty;
    
    @Enumerated(EnumType.STRING)
    private KnowledgeLevel priorKnowledge;
    
    // Getters and setters
    
    public enum Duration {
        SHORT, LONG
    }
    
    public enum Focus {
        DEPTH, BREADTH
    }
    
    public enum ContentFormat {
        COURSE, BLOCK
    }
}

// Progress class
@Embeddable
public class Progress {
    private boolean completed = false;
    private Integer score;
    private int attempts = 0;
    private LocalDateTime lastAttempt = LocalDateTime.now();
    
    // Getters and setters
}
```
### Widget System

```java
// Widget types enum
public enum WidgetType {
    TEXT, IMAGE, VIDEO, CODE, AUDIO, DIAGRAM, EMBED
}

// Widget interface
public interface Widget extends ContentElement {
    WidgetType getWidgetType();
    String render();
}

// Base widget abstract class
@Entity
@Table(name = "widgets")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BaseWidget implements Widget, Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private Integer order;
    
    @Embedded
    private Metadata metadata;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_id", nullable = false)
    private Block block;
    
    public BaseWidget() {}
    
    public BaseWidget(String type, Integer order) {
        this.type = type;
        this.order = order;
    }
    
    @Override
    public WidgetType getWidgetType() {
        return WidgetType.valueOf(type.toUpperCase());
    }
    
    // Abstract method to be implemented by subclasses
    @Override
    public abstract String render();
    
    // Getters and setters
}

// Concrete widget implementations
@Entity
@Table(name = "text_widgets")
public class TextWidget extends BaseWidget {
    @Column(length = 10000)
    private String content;
    
    @Column(length = 1000)
    private String formatting;
    
    public TextWidget() {
        super();
    }
    
    public TextWidget(Integer order, String content) {
        super("TEXT", order);
        this.content = content;
    }
    
    @Override
    public String render() {
        // Simple implementation
        return content;
    }
    
    // Getters and setters
}

@Entity
@Table(name = "image_widgets")
public class ImageWidget extends BaseWidget {
    @Column(nullable = false)
    private String url;
    
    @Column(nullable = false)
    private String altText;
    
    private String caption;
    
    public ImageWidget() {
        super();
    }
    
    public ImageWidget(Integer order, String url, String altText) {
        super("IMAGE", order);
        this.url = url;
        this.altText = altText;
    }
    
    @Override
    public String render() {
        // Simple implementation
        return "<img src='" + url + "' alt='" + altText + "' />";
    }
    
    // Getters and setters
}

@Entity
@Table(name = "video_widgets")
public class VideoWidget extends BaseWidget {
    @Column(nullable = false)
    private String url;
    
    @Column(nullable = false)
    private String embedType;
    
    @Column(nullable = false)
    private String embedId;
    
    public VideoWidget() {
        super();
    }
    
    public VideoWidget(Integer order, String url, String embedType, String embedId) {
        super("VIDEO", order);
        this.url = url;
        this.embedType = embedType;
        this.embedId = embedId;
    }
    
    @Override
    public String render() {
        // Simple implementation based on embed type
        switch (embedType.toLowerCase()) {
            case "youtube":
                return "<iframe src='https://www.youtube.com/embed/" + embedId + "' frameborder='0' allowfullscreen></iframe>";
            case "vimeo":
                return "<iframe src='https://player.vimeo.com/video/" + embedId + "' frameborder='0' allowfullscreen></iframe>";
            default:
                return "<video src='" + url + "' controls></video>";
        }
    }
    
    // Getters and setters
}

// Widget factory for creating appropriate widget types
@Component
public class WidgetFactory {
    public Widget createWidget(String type, Object data, Integer order, Metadata metadata) {
        Widget widget;
        
        switch (type.toUpperCase()) {
            case "TEXT":
                TextWidgetData textData = (TextWidgetData) data;
                widget = new TextWidget(order, textData.getContent());
                ((TextWidget) widget).setFormatting(textData.getFormatting());
                break;
                
            case "IMAGE":
                ImageWidgetData imageData = (ImageWidgetData) data;
                widget = new ImageWidget(order, imageData.getUrl(), imageData.getAltText());
                ((ImageWidget) widget).setCaption(imageData.getCaption());
                break;
                
            case "VIDEO":
                VideoWidgetData videoData = (VideoWidgetData) data;
                widget = new VideoWidget(order, videoData.getUrl(), videoData.getEmbedType(), videoData.getEmbedId());
                break;
                
            default:
                throw new IllegalArgumentException("Unsupported widget type: " + type);
        }
        
        ((BaseWidget) widget).setMetadata(metadata);
        return widget;
    }
    
    // Data classes for widget creation
    @Data
    public static class TextWidgetData {
        private String content;
        private String formatting;
    }
    
    @Data
    public static class ImageWidgetData {
        private String url;
        private String altText;
        private String caption;
    }
    
    @Data
    public static class VideoWidgetData {
        private String url;
        private String embedType;
        private String embedId;
    }
}
```
### Interactive Elements System

```java
// Interactive element types enum
public enum InteractiveElementType {
    QUIZ, POLL, REORDER, MATCHING, FLASHCARD, FILL_BLANK, CODE_EXERCISE
}

// Evaluation result class
@Embeddable
public class EvaluationResult {
    private boolean correct;
    private int score;
    private String feedback;
    
    @ElementCollection
    @CollectionTable(name = "evaluation_hints")
    @Column(name = "hint")
    private List<String> hints = new ArrayList<>();
    
    // Getters and setters
}

// Interactive element interface
public interface InteractiveElement extends ContentElement, ProgressTrackable {
    InteractiveElementType getElementType();
    String getTitle();
    String getInstructions();
    EvaluationResult evaluate(String response);
    String render();
}

// Base interactive element abstract class
@Entity
@Table(name = "interactive_elements")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class BaseInteractiveElement implements InteractiveElement, Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private Integer order;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String instructions;
    
    @Embedded
    private Metadata metadata;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_id", nullable = false)
    private Block block;
    
    @ElementCollection
    @CollectionTable(name = "user_progress", 
        joinColumns = @JoinColumn(name = "element_id"))
    @MapKeyJoinColumn(name = "user_id")
    private Map<User, Progress> userProgress = new HashMap<>();
    
    public BaseInteractiveElement() {}
    
    public BaseInteractiveElement(String type, Integer order, String title) {
        this.type = type;
        this.order = order;
        this.title = title;
    }
    
    @Override
    public InteractiveElementType getElementType() {
        return InteractiveElementType.valueOf(type.toUpperCase());
    }
    
    @Override
    public abstract EvaluationResult evaluate(String response);
    
    @Override
    public abstract String render();
    
    @Override
    public Progress getUserProgress(Long userId) {
        // In a real implementation, we would look up the User entity
        User user = new User();
        user.setId(userId);
        return userProgress.getOrDefault(user, new Progress());
    }
    
    @Override
    public void updateUserProgress(Long userId, Progress progress) {
        // In a real implementation, we would look up the User entity
        User user = new User();
        user.setId(userId);
        userProgress.put(user, progress);
    }
    
    // Getters and setters
}

// Concrete interactive element implementation (Quiz example)
@Entity
@Table(name = "quiz_elements")
public class QuizElement extends BaseInteractiveElement {
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();
    
    public QuizElement() {
        super();
    }
    
    public QuizElement(Integer order, String title) {
        super("QUIZ", order, title);
    }
    
    @Override
    public EvaluationResult evaluate(String response) {
        // Simple implementation
        EvaluationResult result = new EvaluationResult();
        result.setCorrect(true);
        result.setScore(100);
        result.setFeedback("Great job!");
        return result;
    }
    
    @Override
    public String render() {
        // Simple implementation
        StringBuilder sb = new StringBuilder();
        sb.append("<div class='quiz'><h3>").append(getTitle()).append("</h3>");
        
        if (getInstructions() != null) {
            sb.append("<p>").append(getInstructions()).append("</p>");
        }
        
        sb.append("<form>");
        for (Question question : questions) {
            sb.append("<div class='question'>");
            sb.append("<p>").append(question.getText()).append("</p>");
            
            // Render based on question type
            // Implementation details omitted for brevity
            
            sb.append("</div>");
        }
        
        sb.append("<button type='submit'>Submit</button></form></div>");
        return sb.toString();
    }
    
    // Nested entity classes
    @Entity
    @Table(name = "quiz_questions")
    @Data
    public static class Question {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        
        @Column(nullable = false, length = 1000)
        private String text;
        
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private QuestionType type;
        
        @Column(length = 1000)
        private String correctAnswer;
        
        @Column(length = 1000)
        private String explanation;
        
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "quiz_id", nullable = false)
        private QuizElement quiz;
        
        @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Option> options = new ArrayList<>();
    }
    
    @Entity
    @Table(name = "quiz_options")
    @Data
    public static class Option {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        
        @Column(nullable = false, length = 1000)
        private String text;
        
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "question_id", nullable = false)
        private Question question;
    }
    
    public enum QuestionType {
        MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER
    }
}
```
### Content Organization Models

```java
// Block entity
@Entity
@Table(name = "blocks")
@Data
public class Block implements ContentContainer, Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id")
    private GeneratedContent generatedContent;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id")
    private Module module;
    
    @Embedded
    private Metadata metadata;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "block", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("order ASC")
    private List<BaseWidget> widgets = new ArrayList<>();
    
    @OneToMany(mappedBy = "block", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("order ASC")
    private List<BaseInteractiveElement> interactiveElements = new ArrayList<>();
    
    // Methods to get all content elements in order
    public List<ContentElement> getContentElements() {
        List<ContentElement> elements = new ArrayList<>();
        elements.addAll(widgets);
        elements.addAll(interactiveElements);
        elements.sort(Comparator.comparing(ContentElement::getOrder));
        return elements;
    }
}

// Module entity
@Entity
@Table(name = "modules")
@Data
public class Module implements ContentContainer, Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id", nullable = false)
    private GeneratedContent generatedContent;
    
    @Column(length = 1000)
    private String learningObjectives;
    
    @Embedded
    private Metadata metadata;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<Block> blocks = new ArrayList<>();
}
```

### Content Generation Models

```java
// Input source class
@Embeddable
@Data
public class InputSource {
    @Enumerated(EnumType.STRING)
    private InputType type;
    
    @Column(length = 1000)
    private String value;
    
    public enum InputType {
        TOPIC, FILE
    }
}

// Generated content entity
@Entity
@Table(name = "generated_contents")
@Data
public class GeneratedContent implements Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Enumerated(EnumType.STRING)
    private LearningPreferences.ContentFormat format;
    
    @Embedded
    private InputSource inputSource;
    
    @Embedded
    private LearningPreferences preferences;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "generatedContent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Block> blocks = new ArrayList<>();
    
    @OneToMany(mappedBy = "generatedContent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules = new ArrayList<>();
    
    @OneToMany(mappedBy = "generatedContent", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ContentFeedback> feedbacks = new HashSet<>();
    
    @Embedded
    private SharingInfo sharingInfo = new SharingInfo();
    
    @Embeddable
    @Data
    public static class SharingInfo {
        private boolean isShared = false;
        private String shareLink;
        private LocalDateTime sharedAt;
    }
    
    public boolean isCourse() {
        return format == LearningPreferences.ContentFormat.COURSE;
    }
    
    public String share() {
        sharingInfo.setShared(true);
        sharingInfo.setSharedAt(LocalDateTime.now());
        sharingInfo.setShareLink("share/" + id);
        return sharingInfo.getShareLink();
    }
    
    public void unshare() {
        sharingInfo.setShared(false);
    }
    
    public boolean isShared() {
        return sharingInfo.isShared();
    }
    
    public void addFeedback(ContentFeedback feedback) {
        feedbacks.add(feedback);
        feedback.setGeneratedContent(this);
    }
}

// Content feedback entity
@Entity
@Table(name = "content_feedbacks")
@Data
public class ContentFeedback implements Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id", nullable = false)
    private GeneratedContent generatedContent;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private Integer rating;
    
    @Column(length = 1000)
    private String comments;
    
    @Column(length = 1000)
    private String reportedIssue;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```
### Repository Interfaces

```java
// Content element repository
@Repository
public interface ContentElementRepository extends JpaRepository<ContentElement, Long> {
    List<ContentElement> findByBlockOrderByOrderAsc(Block block);
}

// Widget repository
@Repository
public interface WidgetRepository extends JpaRepository<BaseWidget, Long> {
    List<BaseWidget> findByBlockOrderByOrderAsc(Block block);
}

// Interactive element repository
@Repository
public interface InteractiveElementRepository extends JpaRepository<BaseInteractiveElement, Long> {
    List<BaseInteractiveElement> findByBlockOrderByOrderAsc(Block block);
}

// Block repository
@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
    List<Block> findByGeneratedContent(GeneratedContent generatedContent);
    List<Block> findByModule(Module module);
}

// Module repository
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findByGeneratedContent(GeneratedContent generatedContent);
}

// Generated content repository
@Repository
public interface GeneratedContentRepository extends JpaRepository<GeneratedContent, Long> {
    List<GeneratedContent> findByUser(User user);
    List<GeneratedContent> findByUserOrderByCreatedAtDesc(User user);
    Optional<GeneratedContent> findBySharingInfoShareLink(String shareLink);
}

// User repository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

### Service Interfaces

```java
// Content generation service
public interface ContentGenerationService {
    GeneratedContent generateFromTopic(String topic, LearningPreferences preferences, User user);
    GeneratedContent generateFromFile(MultipartFile file, LearningPreferences preferences, User user);
}

// Content generation service implementation
@Service
@RequiredArgsConstructor
public class ContentGenerationServiceImpl implements ContentGenerationService {
    private final AIService aiService;
    private final GeneratedContentRepository contentRepository;
    private final BlockRepository blockRepository;
    private final ModuleRepository moduleRepository;
    private final WidgetFactory widgetFactory;
    private final InteractiveElementFactory elementFactory;
    
    @Override
    public GeneratedContent generateFromTopic(String topic, LearningPreferences preferences, User user) {
        // Create a new generated content
        GeneratedContent content = new GeneratedContent();
        content.setTitle("Learning " + topic);
        content.setDescription("A generated course about " + topic);
        content.setFormat(preferences.getDuration() == LearningPreferences.Duration.LONG ? 
                         LearningPreferences.ContentFormat.COURSE : 
                         LearningPreferences.ContentFormat.BLOCK);
        
        // Set input source
        InputSource inputSource = new InputSource();
        inputSource.setType(InputSource.InputType.TOPIC);
        inputSource.setValue(topic);
        content.setInputSource(inputSource);
        
        // Set preferences and user
        content.setPreferences(preferences);
        content.setUser(user);
        
        // Save the content
        contentRepository.save(content);
        
        // Generate content based on preferences
        if (content.isCourse()) {
            generateCourseContent(content, topic);
        } else {
            generateBlockContent(content, topic);
        }
        
        return content;
    }
    
    @Override
    public GeneratedContent generateFromFile(MultipartFile file, LearningPreferences preferences, User user) {
        // Implementation details omitted for brevity
        // Similar to generateFromTopic but processes file content
        return null;
    }
    
    private void generateCourseContent(GeneratedContent content, String topic) {
        // Implementation details omitted for brevity
        // Would use AI service to generate course structure and content
    }
    
    private void generateBlockContent(GeneratedContent content, String topic) {
        // Implementation details omitted for brevity
        // Would use AI service to generate block content
    }
}
```

This modular, extensible design follows SOLID principles:

1. **Single Responsibility**: Each class has a single purpose (e.g., Widget handles rendering, Block manages content elements)
2. **Open/Closed**: New widget types or interactive elements can be added without modifying existing code
3. **Liskov Substitution**: Any Widget can be used where a widget is expected
4. **Interface Segregation**: Interfaces are focused and specific (e.g., ProgressTrackable for elements that track progress)
5. **Dependency Inversion**: High-level modules depend on abstractions (e.g., repositories, factories)

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER {
        long id PK
        string email
        string passwordHash
        string name
        datetime createdAt
        datetime updatedAt
        datetime lastLogin
    }
    
    USER_PREFERENCES {
        long user_id PK,FK
        enum defaultDuration
        enum defaultFocus
        enum defaultDifficulty
        string accessibilitySettings
    }
    
    GENERATED_CONTENT {
        long id PK
        string title
        string description
        enum format
        datetime createdAt
        datetime updatedAt
        long user_id FK
    }
    
    INPUT_SOURCE {
        long content_id PK,FK
        enum type
        string value
    }
    
    LEARNING_PREFERENCES {
        long content_id PK,FK
        enum format
        enum duration
        enum focus
        enum difficulty
        enum priorKnowledge
    }
    
    SHARING_INFO {
        long content_id PK,FK
        boolean isShared
        string shareLink
        datetime sharedAt
    }
    
    MODULE {
        long id PK
        string title
        string description
        string learningObjectives
        datetime createdAt
        datetime updatedAt
        long content_id FK
    }
    
    BLOCK {
        long id PK
        string title
        string description
        datetime createdAt
        datetime updatedAt
        long content_id FK
        long module_id FK
    }
    
    CONTENT_ELEMENT {
        long id PK
        string type
        int order
        datetime createdAt
        datetime updatedAt
        long block_id FK
    }
    
    WIDGET {
        long id PK,FK
    }
    
    TEXT_WIDGET {
        long id PK,FK
        string content
        string formatting
    }
    
    IMAGE_WIDGET {
        long id PK,FK
        string url
        string altText
        string caption
    }
    
    VIDEO_WIDGET {
        long id PK,FK
        string url
        string embedType
        string embedId
    }
    
    INTERACTIVE_ELEMENT {
        long id PK,FK
        string title
        string instructions
    }
    
    QUIZ_ELEMENT {
        long id PK,FK
    }
    
    QUESTION {
        long id PK
        string text
        enum type
        string correctAnswer
        string explanation
        long quiz_id FK
    }
    
    OPTION {
        long id PK
        string text
        long question_id FK
    }
    
    POLL_ELEMENT {
        long id PK,FK
        string question
        boolean allowMultipleSelections
        boolean showResults
    }
    
    POLL_OPTION {
        long id PK
        string text
        long poll_id FK
    }
    
    REORDERING_ELEMENT {
        long id PK,FK
    }
    
    REORDER_ITEM {
        long id PK
        string text
        int correctPosition
        long reordering_id FK
    }
    
    USER_PROGRESS {
        long element_id PK,FK
        long user_id PK,FK
        boolean completed
        int score
        int attempts
        datetime lastAttempt
    }
    
    CONTENT_FEEDBACK {
        long id PK
        int rating
        string comments
        string reportedIssue
        datetime createdAt
        long content_id FK
        long user_id FK
    }
    
    METADATA {
        long entity_id PK,FK
        string tags
        enum complexity
        int estimatedDuration
    }
    
    USER ||--o{ USER_PREFERENCES : has
    USER ||--o{ GENERATED_CONTENT : creates
    USER ||--o{ CONTENT_FEEDBACK : provides
    USER ||--o{ USER_PROGRESS : tracks
    
    GENERATED_CONTENT ||--|| INPUT_SOURCE : has
    GENERATED_CONTENT ||--|| LEARNING_PREFERENCES : has
    GENERATED_CONTENT ||--|| SHARING_INFO : has
    GENERATED_CONTENT ||--o{ MODULE : contains
    GENERATED_CONTENT ||--o{ BLOCK : contains
    GENERATED_CONTENT ||--o{ CONTENT_FEEDBACK : receives
    
    MODULE ||--o{ BLOCK : contains
    MODULE ||--|| METADATA : has
    
    BLOCK ||--o{ CONTENT_ELEMENT : contains
    BLOCK ||--|| METADATA : has
    
    CONTENT_ELEMENT ||--|| METADATA : has
    
    CONTENT_ELEMENT ||--o{ WIDGET : is
    CONTENT_ELEMENT ||--o{ INTERACTIVE_ELEMENT : is
    
    WIDGET ||--o{ TEXT_WIDGET : is
    WIDGET ||--o{ IMAGE_WIDGET : is
    WIDGET ||--o{ VIDEO_WIDGET : is
    
    INTERACTIVE_ELEMENT ||--o{ QUIZ_ELEMENT : is
    INTERACTIVE_ELEMENT ||--o{ POLL_ELEMENT : is
    INTERACTIVE_ELEMENT ||--o{ REORDERING_ELEMENT : is
    INTERACTIVE_ELEMENT ||--o{ USER_PROGRESS : tracks
    
    QUIZ_ELEMENT ||--o{ QUESTION : contains
    QUESTION ||--o{ OPTION : has
    
    POLL_ELEMENT ||--o{ POLL_OPTION : has
    
    REORDERING_ELEMENT ||--o{ REORDER_ITEM : contains
```

## Error Handling

The application implements a comprehensive error handling strategy:

### Error Categories:

1. **Validation Errors**: Issues with user input
2. **Authentication Errors**: Issues with user authentication
3. **Processing Errors**: Issues during content generation
4. **Storage Errors**: Issues with data persistence
5. **External Service Errors**: Issues with third-party services

### Error Response Format:

```java
@Data
public class ErrorResponse {
    private ErrorDetails error;
    
    @Data
    public static class ErrorDetails {
        private String code;
        private String message;
        private Map<String, Object> details;
        private LocalDateTime timestamp;
        private String requestId;
    }
}
```

### Error Handling Strategy:

1. **Client-Side Validation**: Prevent invalid requests before submission
2. **API Input Validation**: Validate all incoming requests using Spring Validation
3. **Graceful Degradation**: Provide alternative functionality when services fail
4. **Comprehensive Logging**: Log errors with context for debugging
5. **User-Friendly Messages**: Display helpful error messages to users
6. **Retry Mechanisms**: Implement automatic retries for transient failures

## Testing Strategy

The application employs a comprehensive testing strategy:

### Testing Levels:

1. **Unit Testing**: Test individual components in isolation
   - Service methods
   - Utility functions
   - Model validations

2. **Integration Testing**: Test interactions between components
   - API endpoints
   - Service interactions
   - Database operations

3. **End-to-End Testing**: Test complete user flows
   - Content generation workflow
   - User authentication flow
   - Content sharing flow

4. **Performance Testing**: Test system performance under load
   - Content generation response time
   - Concurrent user handling
   - Resource utilization

5. **Accessibility Testing**: Ensure WCAG compliance
   - Screen reader compatibility
   - Keyboard navigation
   - Color contrast

### Testing Tools and Frameworks:

- Unit Testing: JUnit, Mockito
- Integration Testing: Spring Test, Testcontainers
- End-to-End Testing: Selenium, Cypress
- Performance Testing: JMeter, Gatling
- Accessibility Testing: Axe, Lighthouse

### Testing Approach:

- Test-Driven Development (TDD) for core functionality
- Continuous Integration with automated test runs
- Regular accessibility audits
- User acceptance testing with representative users

## Security Considerations

The application implements several security measures:

1. **Authentication**: Secure user authentication with Spring Security and JWT tokens
2. **Authorization**: Role-based access control for protected resources
3. **Data Protection**: Encryption for sensitive data at rest and in transit
4. **Input Validation**: Thorough validation of all user inputs
5. **Rate Limiting**: Protection against abuse and DoS attacks
6. **Content Security**: Validation of generated content for harmful material
7. **Dependency Security**: Regular scanning and updating of dependencies
8. **Audit Logging**: Comprehensive logging of security-relevant events

## Deployment Architecture

The application is designed for cloud deployment with the following architecture:

```mermaid
graph TD
    LB[Load Balancer] --> WebApp1[Web App Instance 1]
    LB --> WebApp2[Web App Instance 2]
    LB --> WebAppN[Web App Instance N]
    
    WebApp1 --> ApiGW[API Gateway]
    WebApp2 --> ApiGW
    WebAppN --> ApiGW
    
    ApiGW --> AuthSvc[Auth Service]
    ApiGW --> ContentSvc[Content Service]
    ApiGW --> UserSvc[User Service]
    
    ContentSvc --> AIService[AI Service]
    ContentSvc --> StorageSvc[Storage Service]
    
    AuthSvc --> UserDB[(User Database)]
    UserSvc --> UserDB
    StorageSvc --> ContentDB[(Content Database)]
    StorageSvc --> FileStorage[(File Storage)]
    
    CDN[Content Delivery Network] --> StaticAssets[(Static Assets)]
    WebApp1 --> CDN
    WebApp2 --> CDN
    WebAppN --> CDN
```

Key deployment components:
- Containerized microservices with Docker and Kubernetes
- Auto-scaling based on demand
- PostgreSQL database with connection pooling
- Content delivery network for static assets
- Monitoring and alerting system with Prometheus and Grafana
- Automated backup and disaster recovery