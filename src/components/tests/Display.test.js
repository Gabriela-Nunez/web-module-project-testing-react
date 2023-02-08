import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');


const testShowData = {
  name: "Stranger Things",
  summary: "A love letter to the '80s classics that captivated…rnatural forces and one very strange little girl.",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: []
    },
    {
      id: 1,
      name: "Season 2",
      episodes: []
    },
    {
      id: 2,
      name: "Season 3",
      episodes: []
    },
    {
      id: 3,
      name: "Season 4",
      episodes: []
    },
    {
      id: 4,
      name: "Season 5",
      episodes: []
    },
  ]
}


test('renders without errors with no props', async () => { 
  render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
  mockFetchShow.mockResolvedValueOnce(testShowData);

  render(<Display />);
  const fetchButton = screen.getByRole("button");
  fireEvent.click(fetchButton);

  const show = await screen.findByTestId('show-container');
  expect(show).toBeInTheDocument();
  
  
});

test('renders show season options matching your data when the button is clicked', async () => {
  mockFetchShow.mockResolvedValueOnce(testShowData);

  render(<Display />)
  const fetchButton = screen.getByRole("button");
  fireEvent.click(fetchButton);

  await waitFor(() => {
    const seasons = screen.queryAllByTestId('season-option');
    expect(seasons).toHaveLength(5);
  })

 });

test('renders displayFunc when fetch button is pressed', async () => {
  mockFetchShow.mockResolvedValueOnce(testShowData);
  const displayFunc = jest.fn();

  render(<Display  displayFunc={displayFunc} />)
  const fetchButton = screen.getByRole("button");
  fireEvent.click(fetchButton);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  })
}) 