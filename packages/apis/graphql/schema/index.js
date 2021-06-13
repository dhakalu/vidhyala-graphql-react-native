const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type User {
    id: ID!
    username: String!
    name: String!
    email: String
}

type Subject {
    id: ID!
    title: String!
    description: String  
    classId: String!
}

type Class {
    id: ID!
    name: String!
    school: String!
    subjects: [Subject!]
}

type School {
    id: ID!
    name: String!
    address: String!
}

type Student {
    id: ID!
    user: User!
    school: School!
    class: Class!
}

type Announcement {
    id: ID!
    subject: String!
    title: String!
    description: String!
}

type Post {
    id: ID!
    creator: User!
    title: String
    content: String
    subject: String!
    comments: [Comment!]!
    likes: Int!
}

type Comment {
    id: ID!
    creator: User!
    content: String!
}

type Like {
    id: ID!
    likedBy: User!
    likedObject: String!
}

input UserInput {
    username: String!
    name: String!
    email: String  
}

input StudentInput {
    userId: String
    schoolId: String
    classId: String
}

input SubjectInput {
    title: String!
    description: String 
    classId: String!
} 

input ClassInput {
    name: String!
    school: String!
}

input SchoolInput {
    name: String!
    address: String!
}

input AnnouncementInput {
    subject: String!
    title: String!
    description: String!
}

input PostInput {
    subject: String!
    title: String!
    content: String!
    creator: String!
}

input CommentInput {
    post: String!
    content: String!
    creator: String!
}

input LikeInput {
    likedBy: String!
    likedObject: String!
}

type RootQuery {
    subjects: [Subject!]!
    schools: [School!]!
    classes: [Class!]!
    users: [User!]!
    students: [Student!]!
    announcements(subject: String): [Announcement!]!
    posts(subject: String): [Post!]!
    comments(post: String): [Comment!]!
    likes(objectId: String): [Like!]!
}

type RootMutation {
    createSubject(subjectInput: SubjectInput): Subject
    createClass(classInput: ClassInput): Class
    createSchool(schoolInput: SchoolInput): School
    createUpdateUser(userInput: UserInput): User
    createStudent(studentInput: StudentInput): Student
    createAnnouncement(announcementInput: AnnouncementInput): Announcement
    createPost(postInput: PostInput): Post
    createComment(commentInput: CommentInput): Comment
    createLike(likeInput: LikeInput): Like
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
