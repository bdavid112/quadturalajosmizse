import './styles/global.scss'
import './styles/layout.scss'
import HeroLayout from './layouts/HeroLayout'
import TextInputOutline from './components/ui/form-elements/TextInputOutline'
import { useId } from 'react'
import NumberInputOutline from './components/ui/form-elements/NumberInputOutline'
import TextAreaOutline from './components/ui/form-elements/TextAreaOutline'
import DropdownOutline from './components/ui/form-elements/DropdownOutline'

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
                label="Text input"
                helperText="Helper text"
                error={false}
              ></TextInputOutline>
              <NumberInputOutline
                id={useId()}
                name="number"
                label="Number input"
                helperText="Helper text"
                min={2}
                max={4}
                error={false}
              ></NumberInputOutline>
              <TextAreaOutline
                id={useId()}
                name="textarea"
                label="Text area"
                helperText="Helper text"
                maxLength={250}
                error={false}
              ></TextAreaOutline>
              <DropdownOutline
                id={useId()}
                name="dropdown"
                label="Dropdown"
                helperText="Helper text"
                error={false}
                options={[
                  { label: 'Option 1', value: 1 },
                  { label: 'Option 2', value: 2 },
                ]}
              ></DropdownOutline>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
