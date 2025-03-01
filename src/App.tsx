import './styles/global.scss'
import './styles/layout.scss'
import HeroLayout from './layouts/HeroLayout'
import ButtonPrimary from './components/ui/ButtonPrimary'
import ButtonSecondary from './components/ui/ButtonSecondary'

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
              <ButtonPrimary text="Primary button"></ButtonPrimary>
              <ButtonSecondary text="Secondary button"></ButtonSecondary>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
