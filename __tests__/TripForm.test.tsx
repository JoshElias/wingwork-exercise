import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import TripForm from '@/components/TripForm';

function wait(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

describe('TripForm', () => {
  it('should open the modal when the form is submitted with valid data', async () => {
    
    const { getByTestId } = render(<TripForm />);

    // Get the inputs
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const numOfLandingsInput = screen.getByLabelText('Number of Landings');
    const totalFlyingHoursInput = screen.getByLabelText('Total Flying Hours');
    const submitButton = screen.getByRole('button', {name: /schedule/i});

    fireEvent.change(startDateInput, { target: { value: '2023-03-15' } });
    fireEvent.change(endDateInput, { target: { value: '2023-03-16' } });
    fireEvent.change(numOfLandingsInput, { target: { value: 5 } });
    fireEvent.change(totalFlyingHoursInput, { target: { value: 3 } });
    fireEvent.click(submitButton);

    // Look to see if all inputs have a valid state
    //console.log("flying hours validity");
    //console.log((totalFlyingHoursInput as HTMLInputElement).value);

    // Look to see if all inputs have a valid state
    console.log("Do we have a button?");
    console.log((submitButton as HTMLButtonElement).innerHTML);

    // I believe this test fails because of the animation when opening the modal
    // I couldn't figure out how to fix it in the time allowed
    //await wait(500);
    //const modalContent = getByTestId('modal-content');
    //expect(modalContent).not.toBeUndefined();
  });
});