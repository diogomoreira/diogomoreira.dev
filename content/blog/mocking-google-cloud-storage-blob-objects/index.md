---
title: "Mocking Google Cloud Storage Objects with Java"
categories:
  - Tech
date: "2023-12-10"
description: How to mock Google Cloud Storage objects in Java.
tags:
  - testing
  - google cloud
  - java
  - spring boot
cover: mocking-gcloud-objects.jpg
coverCredits: Photo by <a href="https://unsplash.com/@loganvoss?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Logan Voss</a> on <a href="https://unsplash.com/photos/abstract-lavender-colored-spheres-with-white-accents-N41lVlml4SQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
comments: true
---

Google Cloud Storage is widely used as a cloud storage service to allow users to store and retrieve objects. When working with it, it's essential to write efficient unit tests to ensure the application behaves as expected.

## Introduction

One common challenge in unit testing is dealing with external dependencies, that's when we use [_mocks_](https://stackoverflow.com/questions/2665812/what-is-mocking) such as Blob Objects from Google Cloud Storage, which may not be readily available during testing or needs to be mocked due to _pricing restrictions_. This blog post will explore how to mock Blob Objects from **Google Cloud Storage** for efficient unit testing.

## A note about mocks

**Mocks** are objects that **simulate the behavior of real objects,** allowing developers to isolate and test specific components of their code.

Suppose you have a class with many dependencies (references to other classes). When you're writing a test for that specific class, you want to make sure that every time this test fails, the feedback should say something about problems in the class in question. That's why we use mocks, by substituting real dependencies with mock objects, developers can control the behavior and responses of these dependencies, making it easier to create focused and reliable tests

Mocks are particularly useful when testing interactions between different parts of a system, as they help identify and fix bugs or design flaws early on. Additionally, mocks facilitate testing in complex scenarios where certain dependencies may be unavailable or difficult to set up, that's the case in this article.

## Understand Google Cloud Storage objects

Google Cloud Storage offers storage classes and objects for managing data in the cloud. In **Java**, you can use the Google Cloud Storage client library to interact with these features. Here's a brief example of some of them

```java
// Create a storage client
Storage storage = StorageOptions.getDefaultInstance().getService();

// Upload an object to a bucket
BlobId blobId = BlobId.of("my-bucket", "my-object");
BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
storage.create(blobInfo, "Hello, Cloud Storage!".getBytes());

// List objects in a bucket
Page<Blob> blobs = storage.list("my-bucket");
for (Blob b : blobs.iterateAll()) {
    System.out.println(b.getName());
}

// Delete an object from a bucket
boolean deleted = storage.delete("my-bucket", "my-object");
if (deleted) {
    System.out.println("Object deleted successfully.");
}
```

So far, we can see that the `storage` object is the one that does most of the job here. And that's the one we should mock in our case.

## Using Google Cloud NIO to mock storage

Google has an in-memory emulator you can use from the Google Cloud NIO. First, we must add the dependency in our `pom.xml`. Bear in mind that a newer version can be available by the time you're reading this post.

```xml
<dependency>
  <groupId>com.google.cloud</groupId>
  <artifactId>google-cloud-nio</artifactId>
  <version>0.126.15</version>
</dependency>
```

Or if you use Gradle.

```java
implementation 'com.google.cloud:google-cloud-nio:0.126.15'
```

And then, during our tests, we can use the `LocalStorageHelper` object to create a _fake_ storage to mock Google Cloud.

```java
Storage storage = LocalStorageHelper.getOptions().getService();
```

From now on, we can keep using storage to create the files inside the buckets and download them in the same way we'll do in the production code.

```java
BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of("my-mock-bucket", "my-mock-object")).build();
storage.create(blobInfo, "A file text".getBytes());

// Later, we can 'download' this file to do
// what is expected from our application.
Blob blob = storage.get("my-mock-bucket", "my-mock-object");
byte[] content = blob.getContent();
System.out.println(new String(content));
```

If you're writing an application on top of Spring Boot, for example, you can also create a configuration class for your tests to "overwrite" the default **Storage** object that is created by default.

```java
@TestConfiguration
public class CloudStorageConfiguration {

  @Bean
  public Storage createMockStorage() throws IOException {
    Storage storage = LocalStorageHelper.getOptions().getService();
    BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of("my-mock-bucket", "my-mock-object")).build();
    // Create some file that you want to use and reflect the
    // one you expect from your Cloud Storage bucket
    Path path = Path.of("src", "test", "resources", "test-resource.txt");
    byte[] content = Files.readAllBytes(path);
    storage.create(blobInfo, content);
    return storage;
  }

}
```

And that's it. Hope this short post added value to your learning and helped you with testing your Java application that has some integration with **Google Cloud Storage**.

Any feedback or suggestions are welcome.

If you found this content relevant, follow me on [Twitter/X](https://x.com/diogodmoreira) and on [Github](https://github.com/diogomoreira)
