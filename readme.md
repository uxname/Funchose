# Funchose - Clear Your Data

Funchose is a Node.js and TypeScript-based project that allows you to filter private and sensitive information from
various data sources. It can be used to check application logs, databases, and other data sources, and returns filtered
and cleared data.

## Features

- Fast and lightweight
- Minimal overhead to prevent application hangs
- Written in Node.js and TypeScript

## How to use

To use Funchose, you can install it via NPM:

```shell
npm install funchose
```

Then, in your Node.js application, you can import and use it like this:

```typescript
import {Detector} from 'funchose';
import {TemplateChecker} from 'funchose/checkers/evm-private-key/evm-private-key.checker';

const detector = new Detector([new TemplateChecker()]);
const filteredData = detector.filter('Your data here');
console.log(filteredData);
```

## Tests

We have included some tests to help you understand how Funchose works. You can run them using the following command:

```
npm test
```

## License

This project is licensed under the MIT License. See the <a href="LICENSE" target="_new">LICENSE</a> file for more
information.

## Contributing

We welcome contributions from everyone.

## Feedback

If you have any feedback or suggestions, please open an issue or pull request on GitHub. We would love to hear from you!


