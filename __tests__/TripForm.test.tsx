import { 
  render, 
  fireEvent, 
  screen, 
  cleanup, 
  RenderResult, 
  waitFor 
} from '@testing-library/react';
import { beforeEach, afterEach } from 'vitest';
import TripForm from '@/components/TripForm';


let container: RenderResult;
let startDateInput: HTMLElement;
let endDateInput: HTMLElement;
let numOfLandingsInput: HTMLElement;
let totalFlyingHoursInput: HTMLElement;
let submitButton: HTMLElement;

beforeEach(() => {
  container = render(<TripForm />);
  startDateInput = container.getByLabelText('Start Date');
  endDateInput = container.getByLabelText('End Date');
  numOfLandingsInput = container.getByLabelText('Number of Landings');
  totalFlyingHoursInput = container.getByLabelText('Total Flying Hours');
  submitButton = container.getByRole('button');
})

afterEach(() => cleanup());


describe('TripForm', () => {

  it('should not display form errors with good data', async () => {

    fireEvent.change(startDateInput, { target: { value: '2023-03-15' } });
    fireEvent.change(endDateInput, { target: { value: '2023-03-16' } });
    fireEvent.change(numOfLandingsInput, { target: { value: 5 } });
    fireEvent.change(totalFlyingHoursInput, { target: { value: 23 } });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const formErrors = await screen.queryAllByTestId('form-error');
      expect(formErrors).toHaveLength(0);
    });
  });

  it('should display form errors with bad data', async () => {
    
    fireEvent.change(startDateInput, { target: { value: '2023-03-16' } });
    fireEvent.change(endDateInput, { target: { value: '2023-03-15' } });
    fireEvent.change(numOfLandingsInput, { target: { value: 0 } });
    fireEvent.change(totalFlyingHoursInput, { target: { value: 0 } });
    fireEvent.click(submitButton);

    await waitFor(async () => {
      const formErrors = await screen.queryAllByTestId('form-error');
      expect(formErrors).toHaveLength(4);
    });
  });
});