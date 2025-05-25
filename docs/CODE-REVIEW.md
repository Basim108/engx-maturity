# Code Review Guidelines

## Overview

Code reviews are a critical part of our development process that ensure code quality, facilitate knowledge sharing, and maintain project standards.
Every pull request must be reviewed by at least one maintainer before merging.

## Reviewer Responsibilities

When conducting a code review, reviewers are expected to thoroughly examine the submitted changes across multiple dimensions:

### 1. Error Detection and Task Compliance

- **Verify correctness**: Ensure the code achieves the stated goals without introducing bugs
- **Check against requirements**: Confirm that the implementation addresses all aspects of the assigned task
- **Identify logical errors**: Look for potential runtime issues, edge cases, and incorrect assumptions
- **Validate error handling**: Ensure appropriate error handling and recovery mechanisms are in place
- **Test coverage**: Verify that critical code paths are covered by tests

### 2. Knowledge Sharing and Documentation

- **Share expertise**: Provide insights about domain-specific knowledge, best practices, and architectural patterns
- **Explain suggestions**: When proposing changes, include rationale and educational context
- **Provide actionable feedback**: Include concrete examples rather than vague criticisms. Instead of "this is wrong," offer "here's how you can make it right, and here's why." This removes ambiguity and makes it easier for the author to understand and implement suggested changes
- **Document decisions**: Help maintain institutional knowledge by explaining complex implementation choices
- **Encourage learning**: Use reviews as opportunities to mentor and educate team members
- **Cross-pollinate knowledge**: Share relevant experiences from other parts of the codebase or similar projects

### 3. Documentation and Technology Validation

- **Test documentation accuracy**: Actually follow setup instructions, configuration guides, and usage examples
- **Verify reproducibility**: Ensure that documentation enables others to successfully implement or configure the solution
- **Check clarity**: Assess whether explanations are clear and comprehensive for the intended audience
- **Validate examples**: Run code examples and verify they work as documented
- **Test edge cases**: Try to break or misuse the documented functionality to identify gaps
- **Environment testing**: When possible, test in different environments or configurations

### 4. Solution Optimization and Alternatives

- **Suggest improvements**: Propose more efficient, maintainable, or elegant solutions when applicable
- **Consider alternatives**: Evaluate whether different approaches might be more suitable
- **Performance implications**: Identify potential performance bottlenecks or optimization opportunities
- **Maintainability**: Assess long-term maintenance burden and suggest simplifications
- **Reusability**: Look for opportunities to create reusable components or refactor duplicated code
- **Security considerations**: Identify potential security vulnerabilities and suggest mitigations

## Review Process

### Before Starting Review

1. [ ] Understand the context and requirements of the task
2. [ ] Check out the branch locally if deep testing is required
3. [ ] Review any related issues, documentation, or design decisions

### During Review

1. [ ] **Read thoroughly**: Don't rush through the code changes
2. [ ] **Test locally**: For significant changes, pull and test the code yourself
3. [ ] **Ask questions**: If something is unclear, ask for clarification rather than assuming
4. [ ] **Be constructive**: Frame feedback positively and provide actionable suggestions
5. [ ] **Prioritize feedback**: Distinguish between critical issues and minor suggestions

### Review Comments Guidelines

- [ ] **Provide context**: Explain why a change is needed or beneficial
- [ ] **Offer solutions**: Don't just identify problems; suggest improvements
- [ ] **Use respectful language**: Maintain a collaborative and professional tone
- [ ] **Categorize feedback**: Mark comments as **blocking**, **suggestions**, or **questions**. For this explicitly start a comment with **BLOCKING:**, etc.

## Quality Standards

### Code Quality Checklist

- [ ] Functions and variables have clear, descriptive names
- [ ] Code is properly commented where necessary
- [ ] No dead code or commented-out sections remain
- [ ] Error handling is appropriate and consistent
- [ ] Security best practices are followed

### Documentation Quality Checklist

- [ ] Setup instructions are complete and accurate
- [ ] Examples are working and relevant
- [ ] Configuration options are documented
- [ ] Dependencies and requirements are clearly stated

## Approval Criteria

A pull request should only be approved when:

- All critical issues have been addressed
- Documentation has been tested and verified
- Code quality meets project standards
- The solution effectively addresses the stated requirements
- Any suggested improvements have been considered or implemented

## Best Practices

- **Review promptly**: Aim to complete reviews within 2–5 days
- **Focus on the most important issues first**: Address critical bugs before style nitpicks
- **Learn from reviews**: Both authors and reviewers should treat reviews as learning opportunities
- **Follow up**: Ensure that feedback has been addressed before final approval
- **Maintain context**: Keep discussions focused on the code and technical merit

Remember: The goal of code review is to improve code quality, share knowledge, and ensure our project maintains high standards while fostering a collaborative development environment.