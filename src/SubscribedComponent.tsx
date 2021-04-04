import { useSelector } from "./useSelector"

export const SubscribedComponent = ({ matchString }: any) => {
  const testValue = useSelector(state => state.testValue.includes(matchString) ? state.testValue : 'wrong' )
  console.log('SUBSCRIBED COMPONENT RENDERING')
  return (
    <span>{testValue}</span>
  )
}