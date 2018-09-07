import { AssertionError } from 'assert';
import reducer from '../index';
import { init, clearEdit, addGroup, removeStrategy, addStrategyToGroup } from '../actions';

const name = 'test';

const featureToggle = {
    name,
    strategies: [
        {
            name: 'default',
        },
    ],
};

const initalizedState = reducer(undefined, init(featureToggle));

test('should be inital state', () => {
    const state = reducer(undefined, {});
    expect(state.toJS()).toEqual({});
});

test('should initialize toggle', () => {
    const action = init(featureToggle);
    const state = reducer(undefined, action);
    expect(state.get(name).get('name')).toBe(name);
    expect(state.get(name).toJS()).toMatchSnapshot();
});

test('should clear toggle from store', () => {
    const initalState = reducer(undefined, init(featureToggle));
    const state = reducer(initalState, clearEdit(name));
    expect(state.get(name)).toBeUndefined();
});

test('should add group to toggle', () => {
    const initalState = reducer(undefined, init(featureToggle));
    const state = reducer(initalState, addGroup(name));
    const jsToggle = state.get(name).toJS();
    expect(jsToggle.dirty).toBeTruthy();
    expect(jsToggle).toMatchSnapshot();
});

test('should remove strategy with given index', () => {
    const stateWithGroup = reducer(initalizedState, addGroup(name));
    const state = reducer(stateWithGroup, removeStrategy(name, 1));

    const jsToggle = state.get(name).toJS();
    expect(jsToggle.strategies.length).toBe(1);
    expect(jsToggle.dirty).toBeTruthy();
    expect(jsToggle).toMatchSnapshot();
});

test('should remove second strategy', () => {
    const toggle = {
        name,
        strategies: [{ name: 'first' }, { name: 'second' }, { name: 'third' }],
    };

    const initState = reducer(undefined, init(toggle));
    const state = reducer(initState, removeStrategy(name, 1));

    const jsToggle = state.get(name).toJS();
    expect(jsToggle.strategies.length).toBe(2);
    expect(jsToggle.dirty).toBeTruthy();
    expect(jsToggle).toMatchSnapshot();
});

test('should add strategy to group', () => {
    const stateWithGroup = reducer(initalizedState, addGroup(name));
    const state = reducer(stateWithGroup, addStrategyToGroup(name, 1, { name: 'default' }));

    const jsToggle = state.get(name).toJS();
    expect(jsToggle.strategies.length).toBe(2);
    expect(jsToggle.strategies[1].group.length).toBe(1);
    expect(jsToggle.dirty).toBeTruthy();
    expect(jsToggle).toMatchSnapshot();
});

test('should add multiple strategies to group', () => {
    const s0 = reducer(initalizedState, addGroup(name));
    const s1 = reducer(s0, addStrategyToGroup(name, 1, { name: 'default' }));
    const s2 = reducer(s1, addStrategyToGroup(name, 1, { name: 'custom' }));
    const s3 = reducer(s2, addStrategyToGroup(name, 1, { name: 'foo' }));

    const jsToggle = s3.get(name).toJS();
    expect(jsToggle.strategies.length).toBe(2);
    expect(jsToggle.strategies[1].group.length).toBe(3);
    expect(jsToggle.dirty).toBeTruthy();
    expect(jsToggle).toMatchSnapshot();
});

test('should not be able to add strategy to no group', () => {
    const f = () => reducer(initalizedState, addStrategyToGroup(name, 0, { name: 'default' }));
    expect(f).toThrow(AssertionError);
});
