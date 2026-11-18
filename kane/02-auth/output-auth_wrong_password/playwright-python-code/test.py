import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="a80997d6-0dde-4497-bee7-208088cf05f4",
    name="Verify Login Error Handling",
    tc_id="TC-14",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"invalid_credentials_error_message": "true", "sign_in_heading": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login', instruction_id='f714ac39-67e9-484b-ac12-62cf04861750'):
        variable_value_0 = var('{{global.base_url}}/login')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the plan steps to be processed', instruction_id='2f38982a-e5ee-4896-9dda-436122221c8f'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='804ceb03-4b55-423e-9a3b-81bdcbd4d7fb'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "not-the-password" into "Password"', instruction_id='5d517c5a-1d59-466e-a2ad-90c6209bf760'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        
        await testmu.fill(element_3, "not-the-password")
    
    async with testmu.step('Clicking Sign in button', instruction_id='2a2eaec9-ca66-4853-8eba-6adc185f5b5a'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether the invalid-credentials error message is present'):
        set_var('invalid_credentials_error_message', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (/invalid\\s+email\\s+or\\s+password/i.test(el(15).textContent));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Invalid email or password"i'], query='whether an error message about invalid email or password is present in the sign-in form alert', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='An error message about invalid email or password is shown.'))
    
    async with testmu.step('Checking whether the Sign in heading is present'):
        set_var('sign_in_heading', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {8: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(8).textContent.trim() === 'Sign in');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Sign in"i]'], query='whether the Sign in heading is present in the main page content', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The 'Sign in' heading is still on the page."))
    
    async with testmu.step('Assertion check', instruction_id='5aabd277-3fa8-4762-b287-86f89d814389'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'An error message about invalid email or password is shown.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{invalid_credentials_error_message}}', 'store_key': 'invalid_credentials_error_message', 'variable_refs': {'{{invalid_credentials_error_message}}': 'true'}}, {'description': "The 'Sign in' heading is still on the page.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{sign_in_heading}}', 'store_key': 'sign_in_heading', 'variable_refs': {'{{sign_in_heading}}': 'true'}}], 'sub_checks': [{'description': 'An error message about invalid email or password is shown.', 'store_key': 'invalid_credentials_error_message', 'expected_value': 'true', 'extracted_value': '{{invalid_credentials_error_message}}', 'operator': 'equals', 'transforms': []}, {'description': "The 'Sign in' heading is still on the page.", 'store_key': 'sign_in_heading', 'expected_value': 'true', 'extracted_value': '{{sign_in_heading}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "an error message about invalid email or password is shown and the 'Sign in' heading is still on the page."})


if __name__ == "__main__":
    testmu.run(test)