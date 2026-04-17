---
title: "Sealed and Final in Java 17+"
categories:
  - Tech
date: "2024-02-18"
description: Exploring sealed classes feature in Java+ 17.
tags:
  - java
  - oop
  - programming
  - learning
cover: java-sealed-final.webp
language: en
---

Java 17 brought the **Sealed Classes** feature, which allows greater control over how to structure a project's class hierarchy. In this post, we'll discuss this feature that permits classes and interfaces to have more control over their allowed subtypes.

The keywords `sealed`, `non-sealed` and `permits` are the ones to be used in the syntax of sealed classes in Java. When we mark a class as `sealed`, it is as if we were marking it as `final`, which does not allow other classes to extend it. So, we add classes that can extend a sealed class with the help of `permits` keyword and then we list the permitted classes.

In the example below, class `A` is marked as `sealed` and allows classes `B` and `C` to extend it.

```java
public sealed class A permits B, C {
     // Some code
}
```

Since classes `B` and `C` extend a `sealed` class, it is mandatory that they be marked as `final`, `sealed` or `non-sealed`.

If class `B` or `C` is marked as `sealed`, it can still allow other classes to extend it via `permits`. When we use `non-sealed`, we "break" this restriction and allow any class to create an extension, as in the case of class C below.

```java
public non-sealed class C extends A {
     // Some code
}
```

In the case of `final`, this class cannot be extended by any other class. In the example below, `B` is marked as `final`, and no class can extend it.

```java
public final class B extends A {
     // Some code
}
```

It is crucial to mark a class as "final" if we are not designing that class with some future extension in mind. The interaction of inherited classes with their parents can be unpredictable if the ancestor was not designed to be inherited.

In general, we should think of class design in two types:

- Classes that are designed to be extended and with sufficient documentation to describe how this should be done;
- Classes marked as `final`, not allowing extensions at all.

Apart from the differences presented above, the `final` keyword in Java is used in other contexts where `sealed` cannot be used, such as **methods**, **attributes**, and **variables**.

Furthermore, `sealed` aims to allow the author of a class or interface to control which code is responsible for implementing it and provide a more declarative way than access modifiers (such as `public` or `protected`...) to restrict the use of a superclass.

This is mainly useful for building libraries in a more secure way without worrying about overwriting definitions by clients.

If you found this content relevant, follow me on [Twitter/X](https://x.com/diogodmoreira) and on [Github](https://github.com/diogomoreira)
