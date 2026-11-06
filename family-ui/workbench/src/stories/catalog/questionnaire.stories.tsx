import type { Meta, StoryObj } from "@storybook/react-vite"
import * as C from "@/components/ui/questionnaire"

/** Official native questionnaire composition; synthetic data only. */
const meta = {
  title: "Catalog/Questionnaire",
  component: C.Questionnaire,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof C.Questionnaire>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <div className="w-full max-w-md p-6">
    <C.Questionnaire>
      <C.QuestionnaireItem name="experience">
        <C.QuestionnaireTitle>How was your experience?</C.QuestionnaireTitle>
        <C.QuestionnaireDescription>A demonstration with synthetic choices.</C.QuestionnaireDescription>
        <C.QuestionnaireChoices>
          <C.QuestionnaireChoice value="good">Good</C.QuestionnaireChoice>
          <C.QuestionnaireChoice value="okay">Okay</C.QuestionnaireChoice>
        </C.QuestionnaireChoices>
      </C.QuestionnaireItem>
      <C.QuestionnaireActions><C.QuestionnaireNext>Next</C.QuestionnaireNext></C.QuestionnaireActions>
    </C.Questionnaire>
  </div>,
}

export const Variants: Story = {
  render: () => <div className="w-full max-w-md p-6">
    <C.Questionnaire>
      <C.QuestionnaireItem name="preference">
        <C.QuestionnaireTitle>Choose an option</C.QuestionnaireTitle>
        <C.QuestionnaireChoices>
          <C.QuestionnaireChoice value="a">Option A</C.QuestionnaireChoice>
          <C.QuestionnaireChoice value="b">Option B</C.QuestionnaireChoice>
        </C.QuestionnaireChoices>
      </C.QuestionnaireItem>
      <C.QuestionnaireActions><C.QuestionnaireSkip>Skip</C.QuestionnaireSkip><C.QuestionnaireSubmit>Submit</C.QuestionnaireSubmit></C.QuestionnaireActions>
    </C.Questionnaire>
  </div>,
}
