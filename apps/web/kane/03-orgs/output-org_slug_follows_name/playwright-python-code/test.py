import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="e65b66de-199c-460f-a91a-250fd05bf219",
    name="Verify Board Name and Address Field Behavior",
    tc_id="TC-38",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"address_field_hello": "hello", "address_field_empty": "true", "address_field_second_team": "second-team", "name_your_board_page": "false", "sign_in_form": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/', instruction_id='d24742ce-97ef-44c6-bb12-483c5213a62a'):
        variable_value_0 = var('{{global.base_url}}/')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking Sign in in the header', instruction_id='5bd374fd-47cf-49d7-b782-1c7a0d87f93d'):
        _loc_1 = page.locator("internal:role=banner >> internal:role=link[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Waiting for the queued plan to finish processing', instruction_id='471a0313-621a-40af-8b2f-cd843677183c'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='33719b41-d754-452e-bf5f-e7719d3d3477'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='465ca354-ac85-48a2-bff2-7a9efe246a5d'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button', instruction_id='c4e43f5d-9bcc-48e0-a815-ad4b42b7a617'):
        _loc_2 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Navigating to /new', instruction_id='ca4a56ad-ea4e-4fbb-9811-44a1f095b91c'):
        variable_value_5 = var('{{global.base_url}}/new')
        await page.goto(variable_value_5)
    
    async with testmu.step('Typing “Hello” into Board name field', instruction_id='3a565325-3534-4bf8-b1b6-322bb6d7e33a'):
        element_6 = page.locator("internal:role=textbox[name=\"Board name\"i]")
        
        await testmu.fill(element_6, "Hello")
    
    async with testmu.step('Reading the Address field value'):
        set_var('address_field_hello', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).value);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Address"i]'], query='the value shown in the Address textbox in the Create board form', expected_value='hello', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the Address field shows 'hello'"))
    
    async with testmu.step('Assertion check', instruction_id='8e8208c4-8abc-422c-a845-79323f751239'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the Address field shows 'hello'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'hello', 'extracted_value': '{{address_field_hello}}', 'store_key': 'address_field_hello', 'variable_refs': {'{{address_field_hello}}': 'hello'}}], 'sub_checks': [{'description': "the Address field shows 'hello'", 'store_key': 'address_field_hello', 'expected_value': 'hello', 'extracted_value': '{{address_field_hello}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': "the Address field shows 'hello'"})
    
    async with testmu.step('Clear Board name', instruction_id='87da3ebd-65c8-4a82-bb2c-81cca4f0547e'):
        element_7 = page.locator("internal:role=textbox[name=\"Board name\"i]")
        
        await testmu.fill(element_7, "")
    
    async with testmu.step('Waiting for the board name to clear completely', instruction_id='c83d987a-b9f6-4903-9edd-86b828c0ee2a'):
        await page.wait_for_timeout(100)
    
    async with testmu.step('Checking whether the Address field is empty'):
        set_var('address_field_empty', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).value === '');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Address"i]'], query='whether the Address textbox in the Create board form is empty', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Address field is empty'))
    
    async with testmu.step('Assertion check', instruction_id='22999c36-4ca8-4493-a16f-026a04672d16'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the Address field is empty', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{address_field_empty}}', 'store_key': 'address_field_empty', 'variable_refs': {'{{address_field_empty}}': 'true'}}], 'sub_checks': [{'description': 'the Address field is empty', 'store_key': 'address_field_empty', 'expected_value': 'true', 'extracted_value': '{{address_field_empty}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the Address field is empty'})
    
    async with testmu.step('Typing Second Team in Board name field', instruction_id='e89e6b05-b078-49b6-b746-07eb3c1b4dbe'):
        element_8 = page.locator("internal:role=textbox[name=\"Board name\"i]")
        
        await testmu.fill(element_8, "Second Team")
    
    async with testmu.step('Reading the Address field value'):
        set_var('address_field_second_team', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).value);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Address"i]'], query='the value in the Address textbox in the Create board form', expected_value='second-team', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the Address field shows 'second-team'"))
    
    async with testmu.step('Assertion check', instruction_id='24a63b04-35bd-4c10-b443-3d01ce7c059f'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the Address field shows 'second-team'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'second-team', 'extracted_value': '{{address_field_second_team}}', 'store_key': 'address_field_second_team', 'variable_refs': {'{{address_field_second_team}}': 'second-team'}}], 'sub_checks': [{'description': "the Address field shows 'second-team'", 'store_key': 'address_field_second_team', 'expected_value': 'second-team', 'extracted_value': '{{address_field_second_team}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': "the Address field shows 'second-team'"})
    
    async with testmu.step('Clicking Back on the Name your board page', instruction_id='6bd5fdc0-e89b-4bd9-9990-e739ef709593'):
        _loc_3 = page.locator("internal:role=button[name=\"Back\"i]")
        
        await _loc_3.click()
    
    async with testmu.step("whether the 'Name your board' page is present", instruction_id='6357bc98-967a-4db1-8fdf-a75f2462c006'):
        set_var('name_your_board_page', await testmu.vision_query(page, "whether the 'Name your board' page is present", ""))
    
    async with testmu.step('whether a sign-in form is present on the page', instruction_id='b17112e0-bb50-4756-b879-174ddb48dc28'):
        set_var('sign_in_form', await testmu.vision_query(page, "whether a sign-in form is present on the page", ""))
    
    async with testmu.step('Assertion check', instruction_id='c0151cce-4bff-4d44-91fc-65bea2e8e30f'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "you leave the 'Name your board' page", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{name_your_board_page}}', 'store_key': 'name_your_board_page', 'variable_refs': {'{{name_your_board_page}}': 'false'}}, {'description': 'you do not see a sign-in form', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{sign_in_form}}', 'store_key': 'sign_in_form', 'variable_refs': {'{{sign_in_form}}': 'false'}}], 'sub_checks': [{'description': "you leave the 'Name your board' page", 'store_key': 'name_your_board_page', 'expected_value': 'false', 'extracted_value': '{{name_your_board_page}}', 'operator': 'equals', 'transforms': []}, {'description': 'you do not see a sign-in form', 'store_key': 'sign_in_form', 'expected_value': 'false', 'extracted_value': '{{sign_in_form}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "you leave the 'Name your board' page and do not see a sign-in form"})


if __name__ == "__main__":
    testmu.run(test)