// Prism language definition for Circom
// This file can be used both on server (SSR) and client side

module.exports = function (Prism) {
  // Define Circom language based on C-like syntax
  Prism.languages.circom = Prism.languages.extend('clike', {
    'comment': [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    'string': {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    'directive': {
      pattern: /pragma\s+circom\s+[^;]+;/,
      alias: 'important',
      inside: {
        'keyword': /pragma|circom/
      }
    },
    'include': {
      pattern: /include\s+"[^"]+";/,
      alias: 'important',
      inside: {
        'keyword': /include/,
        'string': /"[^"]+"/
      }
    },
    'keyword': /\b(?:signal|component|template|var|function|return|if|else|for|while|do|include|pragma|circom|input|output|public|log|assert|main)\b/,
    'builtin': /\b(?:Num2Bits|Bits2Num|Poseidon|BinaryMerkleRoot|MultiMux1|IsZero|IsEqual|LessThan|Mux1|MiMC|EdDSAPoseidonVerifier|Semaphore)\b/,
    'operator': /\+\+|--|<==|==>|<--|-->|&&|\|\||[+\-*\/%&|^!<>=]=?|[?:~]/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    'punctuation': /[{}[\];(),.:]/
  });
};

