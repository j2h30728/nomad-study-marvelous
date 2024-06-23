## Ver.2) AWS Lambda / API GateWay / 무한 스크롤 / suspense

### - AWS Lambda 함수 + API GateWay 로 서버리스 함수 생성

- [관련 내용](https://github.com/j2h30728/react-s3-cloudfront/issues/1)
- [풀 리퀘스트](https://github.com/j2h30728/study-suspense-errorboundary/pull/2)

### - 라이브러리 사용하지않고 suspense, infinite scroll 구현

## Ver.1) 라이브러리 없이 Suspense / ErrorBoundary / Cache 구현하기

### Suspense / ErrorBoundary

Suspense를 사용해 비동기로직 코드와 에러처리를 선언적으로 명시하고 중복을 줄일 수 있다.

```tsx
export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <CharacterList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

- 에러바운더리 추가 내용 : [https://aweary.dev/fault-tolerance-react/](https://aweary.dev/fault-tolerance-react/)

### useFetch 커스텀훅

suspense 를 사용하기 앞서 suspense에게 나의 비동기 로직 상태를 알려줘야한다.

- pending 상태라면 페칭한 함수 반환 값인 promise 를 throw 해주고,</br>
  (나 지금 비동기 로직 진행중~, fallback 보여주는 중)
- promise 가 fulfilled 상태로 완료되면, 어떤 값을 resolve 해줄지,</br>
  (비동기 끝났다~ , 해당 상태시 컴포넌트가 정상적으로 리렌더링 됨)
- promise가 rejected 상태일때는 어떤 에러를 throw 해줄지</br>
  (에러다! 퉤퉤, 에러바운더리에서 캐치하고 설정한 컴포넌트 렌더링 함)

##### [전체 코드](./src/hooks/useFetch.ts)

#### 1. 기본 설정

먼저, 상태와 타입을 설정.

```tsx
type Status = "initial" | "pending" | "fulfilled" | "rejected";

interface UseFetch<T> {
  data?: T;
  status: Status;
  error?: Error;
  cacheKey: string;
}
```

`Status`는 요청의 현재 상태를 나타냄.

|           | 상태                            |
| --------- | ------------------------------- |
| initial   | 초기 상태                       |
| pending   | 데이터를 요청 중인 상태         |
| fulfilled | 데이터를 성공적으로 가져온 상태 |
| rejected  | 에러가 발생한 상태              |

#### 2. 컴포넌트 상태 설정

```tsx
const [state, setState] = useState<UseFetch<T>>({
  data: undefined,
  status: "initial",
  error: undefined,
  cacheKey,
});
```

초기 상태를 설정한다.

#### 3. useEffect 훅

데이터를 가져오는 로직을 `useEffect` 안에 넣는다.

```tsx
useEffect(() => {
  // ...
}, [fetchingCallBackFunction, state.status, cacheKey, isCachedDataValid, setOrGetCacheData]);
```

#### 4. 데이터 가져오기

데이터를 가져오는 함수.

성공하면 `fulfilled` 상태로 설정하고, 실패하면 `rejected` 상태로 설정한다.

```tsx
const loadDataFromEndpoint = async () => {
  try {
    const response = await fetchingCallBackFunction();
    setOrGetCacheData(cacheKey, response);
    setState((prev) => ({ ...prev, data: response, cacheKey, status: "fulfilled" }));
  } catch (error) {
    setState((prev) => ({ ...prev, status: "rejected", error: error as Error }));
  }
};
```

#### 5. 캐싱 로직

만약 데이터가 이미 캐싱되어 있다면, 다시 요청하지 않고 캐싱된 데이터를 사용.

```tsx
if (state.status === "initial") {
  if (isCachedDataValid(cacheKey)) {
    setState((prev) => ({ ...prev, data: setOrGetCacheData(cacheKey), cacheKey, status: "fulfilled" }));
  } else {
    setState((prev) => ({ ...prev, status: "pending" }));
    activePromise.current = loadDataFromEndpoint(); // 데이터 페칭
  }
}
```

#### 6. 서스펜스와 에러 처리

`pending` 상태에서는 Promise를 throw하여 Suspense가 이를 인식하여 내가 설정한 fallback을 보여준다.

`rejected` 상태에서는 Error를 throw하여 에러바운더리에서 에러를 캐치해서 처리할 수 있게 한다.

```tsx
if (state.status === "pending" && activePromise.current) {
  throw activePromise.current; // promise를 저장한 ref.current값
}

if (state.status === "rejected" && state.error) {
  throw state.error;
}
```

```tsx
export default function Home() {
  return (
    <ErrorBoundary>
      {" "}
      //에러 발생시 캐치캐치 나이스캐치
      <Suspense fallback={<Loader />}>
        {" "}
        // pending 상태일때는 <Loader />를 보여줌
        <CharacterList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### ErrorBoundary

사실 공식문서에 코드가 존재한다. [: 공식문서](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

**[Catching rendering errors with an error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)**

- 공식문서 코드

  ```tsx
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      logErrorToMyService(error, info.componentStack);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return this.props.fallback;
      }

      return this.props.children;
    }
  }
  ```

자바스크립트 기준으로 코드가 존재하기때문에 추천하는 [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) 라이브러리 방문해서 타입들을 참고해서 만들었다.
<br/>(사실 그렇게 하지않아도 될정도의 단순한 타입이긴함!)

```tsx
import { Component, ErrorInfo, ReactNode } from "react";

import DefaultErrorBoundary from "./DefaultErrorBoundary";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.error(error, errorInfo);
  }

  public render() {
    if (this.state.hasError && this.state.error) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return this.props.fallback || <DefaultErrorBoundary error={this.state.error} />;
      // 에러바운더리를 사용할때 프롭으로 넘겨주는 폴백이 없다면 기본 에러바운더리를 사용
      // 어떤 에러인지 에러메시지 자체를 프롭으로 넘겨서 렌더하게함
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

실제로 잘못된 URI로 인해서 에러바운더리가 동작하게 될 때의 화면

<img style='margin :0 auto' src='./docs/Image.png' width='400'/>

### caching

1. 인메모리로 캐싱
2. 객체리터럴이 아닌 Map을 사용하고 메서드를 이용
3. 모든 페이지에서 페칭한 데이터를 캐싱해두기 위해서 contextAPI로 최상단에서 context를 묶기
4. 엔드포인트로 캐시키를 설정

```tsx
function App() {
  return (
    <CacheContextProvider>
      <Layout>
        <Outlet />
      </Layout>
    </CacheContextProvider>
  );
}
```

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
const ONE_MINUTE_MS = 60 * 1000;

const getCachedDataOrSet = (cacheExpirationDuration: number = ONE_MINUTE_MS * 10) => {
  const cache = new Map<string, any>();
  return {
    setOrGetCacheData: (key: string, data?: any) => {
      if (cache.has(key)) {
        const { data, expireTime } = cache.get(key);
        if (expireTime > Date.now()) {
          return data;
        }
      }
      cache.set(key, { data, expireTime: Date.now() + cacheExpirationDuration });
      return data;
    },
    isCachedDataValid: (key: string) => {
      if (!cache.has(key)) return false;
      const { expireTime } = cache.get(key);
      return expireTime > Date.now();
    },
  };
};

export default getCachedDataOrSet;
```

| 식별자 명         | 내용                                                                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setOrGetCacheData | - 캐싱되어있거나 캐싱한 데이터를 반환 </br>1. 만약 캐싱되어 있다면 만료시간을 체크하고 유효하다면 캐싱된 값을 반환</br>2. 캐싱된 데이터의 만료시간이 지나갔으면 다시 캐싱하건, 캐싱되어 있지 않는 경우에는 새로 캐싱 |
| isCachedDataValid | - boolean 반환 </br>3. 이 캐시키에 데이터가 캐싱되어있을까?</br>4. 만약 캐싱이 되어있다면, 만료시간이 지나지 않았는지?                                                                                               |
