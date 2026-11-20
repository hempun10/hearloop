import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="d9a4a672-7a4a-401c-9546-4b9682441640",
    name="Verify Reserved Address Error on Board Creation",
    tc_id="TC-17",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"address_reserved_error": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/new', instruction_id='aee2192c-b2bd-4c05-9392-8a226be9d949'):
        variable_value_0 = var('{{global.base_url}}/login?next=/new')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the queued steps to complete', instruction_id='594b3ef5-7d78-4095-a120-c9c60cf902d7'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='5d1dc898-641b-4610-9acd-3963d5a16b2b'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='5d6b84e8-4567-4b42-ac17-25fddfa79e6d'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button', instruction_id='8848b9c4-a221-4c5b-ac22-bf5ef5795cf6'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Typing Login into the Name your board field', instruction_id='5d7b787f-cd2a-4d2a-88f0-37b3686fb7f8'):
        element_5 = page.locator("internal:role=textbox[name=\"Board name\"i]")
        
        await testmu.fill(element_5, "Login")
    
    async with testmu.step('Clicking Create board in the Create board form', instruction_id='b8c058ef-4d38-4213-91bc-709ad89d5b0d'):
        _loc_2 = page.locator("internal:role=button[name=\"Create board\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Checking whether the reserved address error is present'):
        set_var('address_reserved_error', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (/That address is reserved\\./i.test(el(15).textContent || ''));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="That address is reserved. Try"i'], query='whether an error saying the address is reserved is present in the Create board form alert', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='an error says the address is reserved'))
    
    async with testmu.step('Assertion check', instruction_id='0505c5e4-7605-49b0-b54f-ebba159d501c'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'an error says the address is reserved', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{address_reserved_error}}', 'store_key': 'address_reserved_error', 'variable_refs': {'{{address_reserved_error}}': 'true'}}], 'sub_checks': [{'description': 'an error says the address is reserved', 'store_key': 'address_reserved_error', 'expected_value': 'true', 'extracted_value': '{{address_reserved_error}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'an error says the address is reserved'})


if __name__ == "__main__":
    testmu.run(test)