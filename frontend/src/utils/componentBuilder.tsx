import React from 'react';
import type { ComponentSpec } from '../services/api';

type EventHandler = (event: React.SyntheticEvent) => void;

interface EventHandlers {
  onClick?: EventHandler;
  onChange?: EventHandler;
  onSubmit?: EventHandler;
}

// List of allowed HTML elements
const ALLOWED_ELEMENTS = new Set([
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'button', 'input', 'form', 'label', 'select', 'option',
  'img', 'a', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
]);

// Elements that don't need children
const VOID_ELEMENTS = new Set(['input', 'img', 'br', 'hr']);

// Default props for specific elements
const DEFAULT_PROPS: Record<string, Record<string, unknown>> = {
  img: {
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      img.src = 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Image+not+found';
      img.alt = 'Placeholder image';
    },
    loading: 'lazy',
  },
  a: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  input: {
    type: 'text',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Input value:', e.target.value);
    },
  },
};

export function createReactElement(spec: ComponentSpec): React.ReactElement {
  try {
    // Validate element type
    const elementType = ALLOWED_ELEMENTS.has(spec.type) ? spec.type : 'div';

    // Ensure props exists
    const props: Record<string, unknown> = { 
      ...DEFAULT_PROPS[elementType],
      ...(spec.props || {})
    };
    const eventHandlers: EventHandlers = {};

    // Handle common event handlers
    if (typeof props.onClick === 'string') {
      eventHandlers.onClick = (e) => {
        e.preventDefault();
        console.log('Click handler:', props.onClick);
      };
      delete props.onClick;
    }
    if (typeof props.onChange === 'string') {
      eventHandlers.onChange = (e) => {
        e.preventDefault();
        console.log('Change handler:', props.onChange);
      };
      delete props.onChange;
    }
    if (typeof props.onSubmit === 'string') {
      eventHandlers.onSubmit = (e) => {
        e.preventDefault();
        console.log('Submit handler:', props.onSubmit);
      };
      delete props.onSubmit;
    }

    // Add default className for images
    if (elementType === 'img' && !props.className) {
      props.className = 'max-w-full h-auto';
    }

    // Process children if the element is not a void element
    let children: React.ReactNode[] = [];
    if (!VOID_ELEMENTS.has(elementType) && Array.isArray(spec.children)) {
      children = spec.children.map((child) => {
        if (typeof child === 'string') {
          return child;
        }
        return createReactElement(child);
      });
    }

    // Create the React element with processed props and children
    return React.createElement(
      elementType,
      { 
        ...props, 
        ...eventHandlers, 
        key: `${elementType}-${Math.random()}` 
      },
      ...(VOID_ELEMENTS.has(elementType) ? [] : children)
    );
  } catch (error) {
    console.error('Error creating React element:', error);
    // Return a fallback element if something goes wrong
    return React.createElement(
      'div',
      { 
        className: 'p-4 border border-red-500 rounded bg-red-50 text-red-700',
        key: `error-${Math.random()}`
      },
      'Error rendering component'
    );
  }
}
