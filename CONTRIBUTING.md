# Contributing to EngX Maturity

## Types of Contributions

We appreciate contributions of any kind, including: 

- Extending rule sets with new rules or improving existing ones
- Participating in [GitHub discussions](https://github.com/Basim108/engx-maturity/discussions). Your experience is valuable, and we do appreciate your ideas and feedback.
- Voting on discussion topics to indicate your interest and influence the final product.
- Writing or improving documentation and guides.
- Writing articles and provide links to external articles and resources that you find useful in clarifying some rules and the concepts used.
- Suggesting new features or enhancements by [GitHub issues](https://github.com/Basim108/engx-maturity/issues).

## Data Structure

EngX data is located in the `data/rules` folder and consists of several JSON files. File names are used only to **simplify navigation** to a set of rules. Each file contains an array of rules organized by topic or category for easier management.

Before making changes to the data structure, regularly check the guides and [discussions](https://github.com/Basim108/engx-maturity/discussions/4) about data structure decisions. 

**Final decisions** on data structure are maintained as **Architecture Decision Records (ADRs)** that can be found in `arch/src/containers/adrs/*.md` or can be viewed in a structurizr local instance. Here is gide to [setup a structurizr locally](docs/STRUCTURIZR.md#architecture-decisions).

## Testing Your Changes

After making changes, please run unit tests to ensure that everything is working correctly and no existing functionality has been broken.

### Running Jest Unit Tests Locally

The test project is located in the `tests` folder. To run tests locally:

1. Navigate to the tests folder:
   ```bash
   cd tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the test suite:
   ```bash
   npm run test
   ```

> Unit tests are automatically run on each push to GitHub through our CI pipeline. Before creating a pull request and submitting your changes for review, make sure that all CI jobs have passed successfully. You can check the status of CI jobs in the GitHub Actions tab of your pull request.

## Submitting Your Changes

When you're ready to contribute your changes:

1. **Create a Pull Request** with your proposed changes
2. **Review the guidelines**: To understand how your changes will be reviewed, please read the [Code Review Guidelines](docs/CODE-REVIEW.md)
3. **Provide a comprehensive description** in your pull request that includes:
    - What this PR is about
    - Your proposal and the reasoning behind it
    - Why you think this change is important
    - What areas of the project it will affect
    - How it will benefit the project and its users

A well-documented pull request helps reviewers understand your contribution and **speeds up** the review process.

## Reporting Issues

We always welcome bug reports, proposals and overall feedback. Here are a few tips on how you can make reporting your issue as effective as possible.

### Finding Existing Issues
Before filing a new issue, please search our [open issues](https://github.com/Basim108/engx-maturity/issues) to check if it already exists.

If you do find an existing issue, please include your own feedback in the discussion. Do consider upvoting (👍 reaction) the original post, as this helps us prioritize popular issues in our backlog.

## Pull Requests

Please contribute to this repository via [pull requests](https://github.com/Basim108/engx-maturity/pulls).

Each pull request is accepted only when a continues integration (CI) pipeline is successful, which is triggered on each push and pull request creation.

Description of a local environment and other tips for local development can be found in [Development page](https://github.com/Basim108/engx-maturity/blob/main/docs/DEVELOPMENT.md)

### Commit Comments

When commenting on your commits, it is recommended to use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Branch Names

For new branches it is recommended to use "folders" to describe the type of your changes and an issue id if there is one.

For example,

```tech/issue-2-add-job-to-test-data-in-ci```

**tech** means technical changes, for tech debt, ci/cd and other technical activities;

- data/add-incident-management-rules
- feature/issue-9-code-review-check-list-generator
- fix/spelling-issues-in-agile-health-rules


## Setup local environment 

- [Setup and use of Structurizr](docs/STRUCTURIZR.md) to view diagrams, documentation, and architecture decision records ADRs.