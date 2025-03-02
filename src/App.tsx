import './styles/global.scss'
import './styles/layout.scss'
import HeroLayout from './layouts/HeroLayout'
import TextInputOutline from './components/ui/form-elements/TextInputOutline'
import { useId } from 'react'

function App() {
  return (
    <>
      <HeroLayout
        page="about-us"
        section="hero"
        lang="hu"
        divider={true}
      ></HeroLayout>
      <section className="grid padding-y-5xl">
        <div className="row">
          <div className="col-12 width-full">
            <div className="flex flex-gap-lg">
              <TextInputOutline
                id={useId()}
                name="name"
                error={false}
              ></TextInputOutline>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
