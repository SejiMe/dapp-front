## Brief overview

Project-specific guidelines for Dengue Watch application development focusing on hybrid UI framework approach with DaisyUI as primary design system and selective Mantine component integration.

## Communication style

- Focus on practical implementation over theoretical discussions
- Provide code examples when explaining concepts
- Prioritize working solutions over perfect implementations
- Be concise but thorough in explanations

## Development workflow

- Use DaisyUI as primary design system throughout the application
- Only integrate Mantine components when they provide significant value (calendar specifically)
- Maintain consistent theming across all components
- Test integrations thoroughly before finalizing

## Coding best practices

- Use TypeScript interfaces for all props and data structures
- Follow existing file naming conventions (PascalCase for components, camelCase for utilities)
- Implement proper error handling and loading states
- Use DaisyUI classes for styling, avoid inline styles when possible
- Create reusable components with clear prop interfaces

## Project context

- Application uses Next.js 15 with React 19
- Primary UI framework: DaisyUI with Tailwind CSS
- Selective Mantine integration for calendar functionality
- Chart.js for data visualization
- Supabase for authentication and data storage
- SWR for data fetching and caching

## UI/UX preferences

- Maintain DaisyUI "pastel" theme throughout application
- Ensure responsive design for mobile and desktop
- Use consistent spacing and border radius from design tokens
- Implement proper loading states and error handling
- Follow accessibility best practices

## Integration guidelines

- Create theme bridge utilities when mixing UI frameworks
- Map DaisyUI CSS variables to component library props
- Maintain consistent component structure and patterns
- Test theme consistency across different screen sizes
