import './styles.css'
import FLOWERS from './flowers.jpg'
import LOGO from './logo.svg'

const App = () => {
  return (
    <div>
      <h1>Hello - {process.env.NODE_ENV}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, voluptas
        nam distinctio mollitia dignissimos facilis saepe voluptatum nobis
        dolores nesciunt cum? Optio et nobis corporis non! Eum nulla facilis
        necessitatibus excepturi autem, fugiat qui animi iste. Tempore sit
        repellat facilis odio numquam, excepturi, omnis, aliquam dignissimos
        necessitatibus ad officia possimus.
      </p>
      <img src={FLOWERS} alt="flowers" />
      <img src={LOGO} alt="logo" />
    </div>
  )
}

export default App
