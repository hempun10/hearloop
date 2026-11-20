import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="f0b3bac5-7749-4073-afbd-0bec50675ad2",
    name="Manage API Tokens",
    tc_id="TC-45",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"hl_token_shown": "true", "copy_it_now_note_shown": "true", "kane_laptop_listed_under_tokens": "true", "kane_laptop_no_longer_listed": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/settings/token', instruction_id='32619aec-d482-4706-b271-ab8544812f1c'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/settings/token')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the queued email sign-in steps to finish', instruction_id='c8934493-3a29-48eb-b272-28f9befe20a2'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='105952cb-603d-4ac1-a3d0-1aa8fc4c3773'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='aa461ba4-d5e5-4810-b133-53cd84a70bef'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in', instruction_id='866bcce8-408a-4678-ae36-807da2c203e8'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Typing Kane laptop into Token name field', instruction_id='37eea729-8b41-4e04-ad84-b4f49c2375e1'):
        element_5 = page.locator("internal:role=textbox[name=\"Token name\"i]")
        
        await testmu.fill(element_5, "Kane laptop")
    
    async with testmu.step('Clicking Create token button', instruction_id='ba984ddb-4ebd-4849-8797-9ba03a450f81'):
        _loc_2 = page.locator("internal:role=button[name=\"Create token\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Checking whether the new token is shown'):
        set_var('hl_token_shown', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {31: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(31).value.startsWith('hl_'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:testid=[data-testid="token"s]'], query="whether a token starting with 'hl_' is shown in the New token textbox", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="A token starting with 'hl_' is shown."))
    
    async with testmu.step('Checking whether the copy note is shown'):
        set_var('copy_it_now_note_shown', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {29: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(29).textContent.includes('Copy it now'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Copy it now. You won\'t see it"i'], query="whether the note 'Copy it now' is present in the New token section", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The token has the note 'Copy it now'."))
    
    async with testmu.step('Checking whether Kane laptop is listed under Tokens'):
        set_var('kane_laptop_listed_under_tokens', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {35: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(35).textContent.trim()==='Kane laptop');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Kane laptop"i'], query="whether 'Kane laptop' is present in the Tokens list", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="'Kane laptop' is listed under Tokens."))
    
    async with testmu.step('Assertion check', instruction_id='9d66bb01-e746-4262-8977-55f85706d4f4'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "A token starting with 'hl_' is shown.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{hl_token_shown}}', 'store_key': 'hl_token_shown', 'variable_refs': {'{{hl_token_shown}}': 'true'}}, {'description': "The token has the note 'Copy it now'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{copy_it_now_note_shown}}', 'store_key': 'copy_it_now_note_shown', 'variable_refs': {'{{copy_it_now_note_shown}}': 'true'}}, {'description': "'Kane laptop' is listed under Tokens.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{kane_laptop_listed_under_tokens}}', 'store_key': 'kane_laptop_listed_under_tokens', 'variable_refs': {'{{kane_laptop_listed_under_tokens}}': 'true'}}], 'sub_checks': [{'description': "A token starting with 'hl_' is shown.", 'store_key': 'hl_token_shown', 'expected_value': 'true', 'extracted_value': '{{hl_token_shown}}', 'operator': 'equals', 'transforms': []}, {'description': "The token has the note 'Copy it now'.", 'store_key': 'copy_it_now_note_shown', 'expected_value': 'true', 'extracted_value': '{{copy_it_now_note_shown}}', 'operator': 'equals', 'transforms': []}, {'description': "'Kane laptop' is listed under Tokens.", 'store_key': 'kane_laptop_listed_under_tokens', 'expected_value': 'true', 'extracted_value': '{{kane_laptop_listed_under_tokens}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "A token starting with 'hl_' is shown with the note 'Copy it now' and 'Kane laptop' is listed under Tokens."})
    
    async with testmu.step('Clicking Revoke for Kane laptop', instruction_id='ca635f24-b380-450c-b4bc-a5d821497d9a'):
        _loc_3 = page.locator("internal:role=button[name=\"Revoke Kane laptop\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('Clicking confirm the revocation button', instruction_id='7f9810a9-bb84-4331-abd0-5fa84eb93857'):
        _loc_4 = page.locator("internal:role=button[name=\"Revoke\"i]")
        
        await _loc_4.click()
    
    async with testmu.step('whether the Kane laptop token is present in the Tokens list on the Loop API tokens settings page', instruction_id='aa1fcd92-91dd-49a9-a948-40273d94b55b'):
        set_var('kane_laptop_no_longer_listed', await testmu.vision_query(page, "whether the Kane laptop token is present in the Tokens list on the Loop API tokens settings page", ""))
    
    async with testmu.step('Assertion check', instruction_id='091ade86-8813-4671-b839-e48e04b734bd'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "'Kane laptop' is no longer listed.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{kane_laptop_no_longer_listed}}', 'store_key': 'kane_laptop_no_longer_listed', 'variable_refs': {'{{kane_laptop_no_longer_listed}}': 'false'}}], 'sub_checks': [{'description': "'Kane laptop' is no longer listed.", 'store_key': 'kane_laptop_no_longer_listed', 'expected_value': 'false', 'extracted_value': '{{kane_laptop_no_longer_listed}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "'Kane laptop' is no longer listed."})


if __name__ == "__main__":
    testmu.run(test)