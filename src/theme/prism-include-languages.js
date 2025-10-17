/**
 * Custom Prism languages loader
 * This file is imported by Docusaurus to add custom language support
 */

export default function prismIncludeLanguages(PrismObject) {
  // Load standard additional languages
  const additionalLanguages = ['rust', 'solidity', 'python', 'javascript', 'typescript', 'json', 'bash'];
  
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    try {
      require(`prismjs/components/prism-${lang}`); // eslint-disable-line
    } catch (e) {
      // Language already loaded or doesn't exist
    }
  });

  // Add Python aliases for SageMath and 'py'
  if (PrismObject.languages.python) {
    // 'py' alias
    PrismObject.languages.py = PrismObject.languages.python;
    
    // 'sage' alias for SageMath (which is Python-based)
    // Add SageMath-specific functions and keywords
    PrismObject.languages.sage = PrismObject.languages.extend('python', {
      'builtin': /\b(?:GF|Ideal|gens|variety|QQ|ZZ|RR|CC|PolynomialRing|Matrix|vector|prime_range|factor|gcd|lcm|sqrt|exp|log|sin|cos|tan)\b/
    });
    
    // Add common SageMath functions to the builtin pattern
    PrismObject.languages.insertBefore('sage', 'builtin', {
      'sage-function': /\b(?:Ideal|variety|gens|extend|insertBefore)\b/
    });
  }

  // Define Circom language - SSR-safe approach
  // We'll make it an alias/extension of JavaScript with Circom keywords
  if (!PrismObject.languages.circom) {
    // Start with JavaScript as base (it's already loaded)
    PrismObject.languages.circom = PrismObject.languages.extend('javascript', {
      keyword: /\b(?:signal|component|template|var|function|return|if|else|for|while|do|include|pragma|circom|input|output|public|log|assert|main|break|continue|const|let)\b/,
      'class-name': /\b[A-Z]\w*\b/
    });
    
    // Add Circom-specific builtins
    PrismObject.languages.insertBefore('circom', 'keyword', {
      'builtin': /\b(?:Poseidon|Num2Bits|Bits2Num|IsZero|IsEqual|LessThan|GreaterThan|MultiMux1|BinaryMerkleRoot|Mux1|Mux2|Mux3|MiMC|MiMCSponge|EdDSA|Pedersen|SMT)\b/,
      'operator': /[<>]=?|\*\*|[-+*/%]|===?|!==?|&&|\|\|/
    });
  }

  delete globalThis.Prism;
}

