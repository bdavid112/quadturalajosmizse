import './styles/global.scss'
import './styles/layout.scss'
import HeroLayout from './layouts/HeroLayout'
import TextInputOutline from './components/ui/form-elements/TextInputOutline'
import { useId } from 'react'
import NumberInputOutline from './components/ui/form-elements/NumberInputOutline'
import TextAreaOutline from './components/ui/form-elements/TextAreaOutline'
import DropdownOutline from './components/ui/form-elements/DropdownOutline'
import DatePickerOutline from './components/ui/form-elements/DatePickerOutline'
import {
  LocalizationProvider,
  useLocalization,
} from './context/LocalizationContext'
import ButtonPrimary from './components/ui/buttons/ButtonPrimary'
import SegmentedButton from './components/ui/buttons/SegmentedButton'

function TestLocalization() {
  const { lang, setLang } = useLocalization()

  return (
    <>
      <HeroLayout page="about-us" section="hero" divider={true}></HeroLayout>
      <section className="grid padding-y-5xl">
        <div className="row">
          <div className="col-6">
            <h1>Custom UI components</h1>
          </div>
        </div>
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
        <div className="row">
          <div className="col-12">
            <div className="flex flex-gap-lg">
              <TextAreaOutline
                id={useId()}
                name="textarea"
                label="Text area"
                helperText="Helper text"
                maxLength={250}
                error={false}
              ></TextAreaOutline>
              <DatePickerOutline
                id={useId()}
                name="calendar"
                label="Calendar"
                helperText="Helper text"
                error={false}
              ></DatePickerOutline>
              <ButtonPrimary
                label={lang === 'en' ? 'Change to Hungarian' : 'Váltás angolra'}
                onClick={() => {
                  setLang(lang === 'en' ? 'hu' : 'en')
                }}
              ></ButtonPrimary>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <SegmentedButton
              labels={['Button 1', 'Button 2', 'Button 3']}
            ></SegmentedButton>
          </div>
        </div>
      </section>
    </>
  )
}

function App() {
  return (
    <LocalizationProvider>
      <TestLocalization></TestLocalization>
    </LocalizationProvider>
  )
}

export default App
