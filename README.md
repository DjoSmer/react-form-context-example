# React Form Context Example

###One example using Context + PureComponent + Redux

При изменения Context, обновляются все компоненты, 
которые на него подписаны. Из-за чего часто происходит 
не нужные ререндоры.

У Redux есть хук useSelector, которая запускает ререндер,
только если изменились выходные данные.
И на основе его сделал хук (makeFormControl),
но нужно было как то передавать состояние с Классового компонента.
И на выход пришел EventBus. Функция componentDidUpdate вызывается
когда изменился состояние, дергает EventBus и передает состояние(FormControlComponent).
При использование хука, компонент подписывается на изменение состояние,
дальше вызывается входящая функция и сравнивается с предыдушем состоянием в хуке.


[Demo](https://codesandbox.io/s/react-form-context-example-r7refw)