# Zustand 사용해서 TodoList 만들어본 후기

### 일단 Zustand가 뭔데?

Zustand는 리액트에서 상태 관리를 쉽게 할 수 있도록 도와주는 라이브러리다. Redux보다 가볍고 사용법이 간단해서 많이 쓰인다.

### 기본적인 사용 방법

#### <스토어 생성>

`create`로 스토어 생성 후 `create` 함수의 콜백은 `set`, `get`은 배개 변수로 갖고 있고, 이를 통해 상태를 변경하거나 조회할 수 있다.

```javascript
import { create } from "zustand";

export const useTodoStore = create((set, get) => {
  return {
    todos: [],
    actions: {
      add: () => {},
    },
  };
});
```

`create` 함수의 콜백이 반환하는 객체에서 속성은 상태(State)이고, 메소드는 액션(Action)이라고 부른다.
<br>
나는 상태와 액션을 분리해 관리하는 패턴을 활용했다.

#### <컴포넌트에서 사용>

```javascript
import { useTodoStore } from "./store/todos";

export default function App() {
  const todos = useTodoStore((state) => state.todos);
  const { add, remove } = useTodoStore((state) => state.actions);

  return (
    <div>
      {...}
    </div>
  )
}
```

### 상태(State)를 초기화하는 방법

```javascript
import { create } from "zustand";

const initalState = {
  todos: [],
};

export const useTodoStore = create((set, get) => {
  return {
    ...initialState,
    actions: {
      add: () => {},
      resetState: () => set(initalState),
    },
  };
});
```

`initialState`를 선언해두고 전체 상태를 초기화하는 액션을 만들면된다.

> 일부 상태를 초기화하도록 함수를 수정해서 사용해도 됨. 자유임

### 미들웨어

미들웨어는 Zustand의 상태 관리 기능을 확장해주는 추가 기능이다.

#### 대략 이런 곳에 쓰일 수 있다.

- 상태 변경 로그 남기기
- API 호출할 때 상태 자동 변경하기
- 새로고침해도 상태 유지하기

> Zustand에서 쓰이는 미들웨어는 많지만 한 가지만 알아보겠다.

#### 로그를 남기는 `logger` 미들웨어

```javascript
import { create } from "zustand";
import { devtools, logger } from "zustand/middleware";

const useStateStore = create(
  logger((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
  }))
);

// 사용

useStore.subscribe((state) => console.log("상태 변경:", state));
```

상태가 변경되면 콘솔에 로그가 남겨진다. 외에도 로컬 스토리지에 저장하는 미들웨어 등 여러가지가 있다.

### 여기서 생기는 의문

> `Context API`나 `Redux`는 `Provider`를 사용해야 전역 상태를 공유할 수 있는데, Zustand는 왜 `Provider` 없이도 가능할까?

React 상태가 아니라 "독립적인 자바스크립트 변수"로 관리되기 때문에 리액트 컴포넌트 어디에서든 같은 `store`를 조회하면 같은 데이터를 공유할 수 있다.
<br>
자바스크립트 영역인데 어떻게 리렌더링까지 이뤄지는지? `store`를 호출하면 컴포넌트가 Zustand의 `store`를 구독하게 된다. 상태가 변경되면 Zustand가 변경된 상태를 구독한 컴포넌트에만 알림을 보내 리렌더링되게 한다. `EventEmitter` 패턴과 비슷한 것 같다.<br>
비슷하지만 Zustand는 구독해서 상태가 변경되면 자동으로 감지하는 방식이니 다르다고 할 수 있다.
