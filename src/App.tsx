import './styles/global.scss'
import './styles/layout.scss'
import HeroLayout from './layouts/HeroLayout'
import ButtonPrimary from './components/ui/buttons/ButtonPrimary'
import ButtonSecondary from './components/ui/buttons/ButtonSecondary'
import ButtonPrimaryOutline from './components/ui/buttons/ButtonPrimaryOutline'
import ButtonSecondaryOutline from './components/ui/buttons/ButtonSecondaryOutline'

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
            <div className="flex flex-gap-lg justify-center">
              <ButtonPrimary text="Primary button"></ButtonPrimary>
              <ButtonSecondary text="Secondary button"></ButtonSecondary>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 width-full">
            <div className="flex flex-gap-lg justify-center">
              <ButtonPrimaryOutline text="Primary button"></ButtonPrimaryOutline>
              <ButtonSecondaryOutline text="Secondary button"></ButtonSecondaryOutline>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
