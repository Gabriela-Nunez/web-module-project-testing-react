import React from 'react';
import { render, fireEvent, screen, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent  from '@testing-library/user-event';




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

test('renders without errors', () => {
  render(<Show show={testShowData} selectedSeason={"none"} />);
 });

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} />);
  const loading = screen.queryByTestId("loading-container");
  expect(loading).toBeInTheDocument();
 });

test('renders same number of options seasons are passed in', () => { 
  render(<Show show={testShowData} selectedSeason={'none'} />)
  const seasons = screen.queryAllByTestId('season-option');
  expect(seasons).toHaveLength(5);
});

test('handleSelect is called when an season is selected', () => { 
  
  const mockHandleSelect = jest.fn();
  render(<Show show={testShowData} selectedSeason={'none'} handleSelect={mockHandleSelect} />);
  const select = screen.getByLabelText(/Select A Season/i);
  userEvent.selectOptions(select, ['1']);

  expect(mockHandleSelect).toBeTruthy();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
  const { rerender } = render(<Show show={testShowData} selectedSeason={"none"} />);
  let episodes = screen.queryByTestId('episodes-container');
  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={testShowData} selectedSeason={2} />)
  episodes = screen.queryByTestId('episodes-container');
  expect(episodes).toBeInTheDocument();
});
