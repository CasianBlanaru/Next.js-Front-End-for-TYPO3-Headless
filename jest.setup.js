jest.mock('next/dynamic', () => {
  return () => {
    const DynamicComponent = () => null;
    DynamicComponent.displayName = 'DynamicMock';
    return DynamicComponent;
  };
});
