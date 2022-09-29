# React custom hooks

Custom hooks library usable with react.

## Table of content

- [useClickAway](#useclickaway)
- [useDebounce](#usedebounce)
- [useDebounceLeading](#usedebounceleading)
- [useDebounceValue](#usedebouncevalue)
- [useFetch](#usefetch)
- [useInterval](#useinterval)
- [useLog](#uselog)
- [useMove](#usemove)
- [useScroll](#usescroll)
- [useTimeout](#usetimeout)

## Documentation

### useClickAway

Property | Type | Required | Description
--- | --- | --- | ---
**ref** | `RefObject<Element>` | yes | Element's ref, on which we'll add the event listener
**callback** | `(event: MouseEvent) => void` | yes | The callback handler

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const ref = useRef(null);
    
    const handleClickAway = () => {
        console.log('clicked away');
    }
    
    useClickAway(ref, handleClickAway);
    
    return (
        <button ref={ref}>My button</button>
    )
}
```
<hr/>

### useDebounce

Property | Type | Required | Description
--- | --- | --- | ---
**callback** | `(...args: any) => void` | yes | Callback function which will be called after a delay
**timeout** | `number` | no | Timeout's delay

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const [value, setValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    
    const debouncedValueCallback = useDebounce((newValue) => {
        setDebouncedValue(newValue);
    }, 500);
    
    useEffect(() => {
        debouncedValueCallback(value);
    }, [value, debouncedValueCallback]);
    
    return (
        <div>
            <input
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            {debouncedValue} {/* <- debouncedValue will change after not typing for 500ms */}
        </div>
    )
}
```
<hr/>

### useDebounceLeading

Property | Type | Required | Description
--- | --- | --- | ---
**callback** | `(...args: any) => void` | yes | Callback function which will be called after a delay
**timeout** | `number` | no | Timeout's delay

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const [count, setCount] = useState(0);
    
    // count will be incremented by 1 only each 500 ms
    // even if the button is clicked 10 times in 1s
    const debouncedClick = useDebounceLeading(() => {
        setCount((prev) => prev + 1);
     }, 500);
    
    return (
        <>
            <button onClick={debouncedClick}>click</button>
            <div>{count}</div>
        </>
    )
}
```
<hr/>

### useDebounceValue

Property | Type | Required | Description
--- | --- | --- | ---
**value** | `string` | yes | Value to debounce

Improve the `useDebounce` hook by returning the debounced value and not have to handle it yourself in your component.

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounceValue(value);
    
    return (
        <div>
            <input
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            {debouncedValue} {/* <- debouncedValue will change after not typing for 500ms */}
        </div>
    )
}
```
<hr/>

### useFetch

Property | Type | Required | Description
--- | --- | --- | ---
**url** | `string` | no | The url to fetch data from
**options** | `RequestInit` | no | The options to add to the request

- Usage Exemple : 
```typescript jsx

interface User {
  id: number
  lastName: string
  firstName: string
}

export default function MyComponent() {
    const { data, error, loading } = useFetch<User[]>('https://my-url.com/users')
    
    if (error) return <p>There is an error.</p>
    if (loading) return <p>Loading...</p>
    if (!data) return <p>No data</p>;
    return <p>{data[0].lastName} {data[0].firstName}</p>
}
```
<hr/>

### useInterval

Property | Type | Required | Description
--- | --- | --- | ---
**callback** | `() => {}` | yes | Callback function which will be called each interval's tick
**delay** | `number` or `null` | yes | Interval's tick delay

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const [count, setCount] = useState(0);    
    const [stop, setStop] = useState(false);    

    useInterval(() => {
        setCount(prev => prev + 1);
    }, stop ? null : 500); // null to stop it 
    
    return (
        <>
            <p>{count}</p> 
            <button onClick={() => setStop(true)}>
                Stop counting
            </button>
        </>
    )
}
```
<hr/>

### useLog

Property | Type | Required | Description
--- | --- | --- | ---
**state** | `any` | yes | Value to watch

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const [count, setCount] = useState(0);

    useLog(count);

    return <></>
}
```
<hr/>

### useMove

Property | Type | Required | Description
--- | --- | --- | ---
**ref** | `RefObject<HTMLElement>` | yes | ref element that you want to move

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const myRef = useRef(null);
    useMove(myRef);
    
    return (
        <>
            <div 
                draggable 
                ref={myRef} 
                style={{position: 'absolute'}}
            >
                drag me
            </div>
            ...
        </>
    )
}
```
<hr/>

### useScroll

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const scrollData = useScroll();

    console.log(scrollData.scrollX, scrollData.scrollY); // window scroll values

    ...
}
```
<hr/>

### useTimeout

Property | Type | Required | Description
--- | --- | --- | ---
**callback** | `() => {}` | yes | Callback function which will be called after a delay
**delay** | `number` or `null` | yes | Timeout's delay

- Usage Exemple : 
```typescript jsx
export default function MyComponent() {
    const [messageVisible, setMessageVisible] = useState(true);

    useTimeout(() => {
        setMessageVisible(false);
    }, 3000);
    
    return (
        <>
            {messageVisible && <p>This is visible for 3s</p>}
        </>
    )
}
```
<hr/>
