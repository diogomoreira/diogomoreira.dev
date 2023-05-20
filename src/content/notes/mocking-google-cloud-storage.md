---
title: Mocking Google Cloud Storage Blob Objects
description: Google Cloud Storage is widely used as a cloud storage service to allow users to store and retrieve objects. When working with it, it's essential to write efficient unit tests to ensure that the application behaves as expected. In this post, we'll going to create mocks that simulates Google Storage objects.
status: draft
timestamp: "2023-05-20"
cover: mock-google-storage.jpg
comments: true
category: development
tags: [testing, google_cloud, java, en-us]
---

Google Cloud Storage is widely used as a cloud storage service to allow users to store and retrieve objects. When working with Google Cloud Storage, it's essential to write efficient unit tests to ensure that the application behaves as expected.

One common challenge in unit testing is dealing with external dependencies, that's when we use [_mocks_](https://stackoverflow.com/questions/2665812/what-is-mocking) such as Blob Objects from Google Cloud Storage, which may not be readily available during testing or needs to be mocked due to _pricing restrictions_. In this blog post, we will explore how to mock Blob Objects from **Google Cloud Storage** for efficient unit testing.

## A note about mocks

**Mocks** are objects that **simulate the behavior of real objects,** allowing developers to isolate and test specific components of their code.

Suppose you have a class with many dependencies (references to other classes). When you're writing a test for that specific class, you want to make sure that every time this test fails, the feedback should tell something about problems in the class in question. That's why we use mocks, by substituting real dependencies with mock objects, developers can control the behavior and responses of these dependencies, making it easier to create focused and reliable tests

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

Google has an in-memory emulator you can use from the Google Cloud NIO. First, we must add the dependency in our `pom.xml`.

```xml
<dependency>
  <groupId>com.google.cloud</groupId>
  <artifactId>google-cloud-nio</artifactId>
  <version>0.126.15</version>
</dependency>
```

Or if you use Gradle.

```javascript
implementation 'com.google.cloud:google-cloud-nio:0.126.15'
```

And then, during our tests, we can use the `LocalStorageHelper` object to create a _fake_ storage to mock Google Cloud.

```javascript
Storage storage = LocalStorageHelper.getOptions().getService();
```

From now on, we can keep using storage to create the files inside the buckets and download them in the same way we'll do in the production code.

```javascript
BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of("my-mock-bucket", "my-mock-object")).build();
storage.create(blobInfo, "A file text".getBytes());

// Later, we can 'download' this file to do what is expected from our application.
Blob blob = storage.get("my-mock-bucket", "my-mock-object");
byte[] content = blob.getContent();
System.out.println(new String(content));
```

If you're writing an application on top of Spring Boot, for example, you can also create a configuration class for your tests to "overwrite" the default **Storage** object that is created by default.

```javascript
@TestConfiguration
public class CloudStorageConfiguration {

    @Bean
    public Storage createMockStorage()) throws IOException {
        Storage storage = LocalStorageHelper.getOptions().getService();
        BlobInfo blobInfo = BlobInfo.newBuilder(BlobId.of("my-mock-bucket", "my-mock-object")).build();
        // Create some file that you want to use and reflect the
        // you expect from your Cloud Storage
        storage.create(blobInfo, Files.readAllBytes(Path.of("src", "test", "resources", "test-resource.txt")));
        return storage;
    }

}
```

And that's it. Hope this short post added value to your learning and help you with testing your Java application that has some integration with **Google Cloud Storage**.

Any feedback or suggestions are welcome.
