## Entity Relationship Diagram (ERD)

````mermaid
erDiagram
    USER {
        long id PK
        string email
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

    WIDGET {
        long id PK
        enum type
        int order
        string content
        datetime createdAt
        datetime updatedAt
        long block_id FK
    }

    INTERACTIVE_ELEMENT {
        long id PK
        enum type
        int order
        string title
        string instructions
        string content
        datetime createdAt
        datetime updatedAt
        long block_id FK
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

    INTERACTIVE_ELEMENT ||--o{ USER_PROGRESS : tracks
````