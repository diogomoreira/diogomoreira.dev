---
title: "Clear UIComponents Method (JSF 2.x)"
date: 2026-03-31T13:34:52-03:00
draft: true
language: "Java"
description: "This method clears components and their children on a JSF Tree recursively."
tags: [java, jsf, frontend]
---

This method clears components and his children on JSF Tree recursively, it receives any UIComponent as a parameter. If you'd like to clear all the tree, use the tree root as a parameter, which can be obtained by using "FacesContext().getCurrentInstance().getViewRoot();

```java
public static UIComponent clearComponents(UIComponent root) {
	if (root instanceof EditableValueHolder) {
		EditableValueHolder evh = (EditableValueHolder) root;
		evh.setSubmittedValue(null);
		evh.setValue(null);
		evh.setLocalValueSet(false);
		evh.setValid(true);
	}
	UIComponent child = null;
	UIComponent node = null;
	Iterator<UIComponent> children = root.getFacetsAndChildren();
	while(children.hasNext() && node == null) {
		child = children.next();
		node = clearComponents(child);
	}
	return null;
}
```
