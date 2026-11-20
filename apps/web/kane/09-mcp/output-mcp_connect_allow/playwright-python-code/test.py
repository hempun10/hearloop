import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="265f463b-9c7c-4673-97d4-8e2d9eaa7584",
    name="Authorize Kane Test Client Access",
    tc_id="TC-60",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"allow_kane_test_client_heading_visible": "true", "localhost_3000_approval_destination_visible": "true", "site_navigation_header_visible": "false", "footer_visible": "false", "allow_authorization_page_visible": "false", "address_bar_url_code": "http://localhost:3000/callback?code=kMGZSc4CiOaZEZ1r05JeG2eKJSYSy0ig&state=kane&iss=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to [REDACTED]', instruction_id='09ee688d-267d-4539-9880-e818326f1684'):
        variable_value_0 = var('{{secrets.user.mcp_authorize_url}}')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the queued plan to continue', instruction_id='ea8c9cba-30bc-4a3b-a2c2-fbbbf939728c'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='d69b84d8-3c9e-4944-9f23-33e17dd3083d'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='f894b31c-43bf-4b10-af9e-1d45b0616015'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button', instruction_id='2cfc6d92-1c06-4321-b0e8-09d39651507c'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Allow Kane Test Client to use hearloop heading to appear', instruction_id='6c31771f-ef16-4ff0-b072-9e82dca34bed'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Allow Kane Test Client to use hearloop?' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the consent page heading is present'):
        set_var('allow_kane_test_client_heading_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {2: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(2).textContent.trim() === 'Allow Kane Test Client to use hearloop?');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Allow Kane Test Client to use"i]'], query="whether the level 1 heading in the main content reads 'Allow Kane Test Client to use hearloop?'", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="A page with the heading 'Allow Kane Test Client to use hearloop?' appears."))
    
    async with testmu.step('Checking whether the approval destination is present'):
        set_var('localhost_3000_approval_destination_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {4: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(4).textContent.includes('Approval is sent to localhost:3000.'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Approval is sent to localhost"i'], query='whether the approval destination localhost:3000 is stated in the approval notice paragraph', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The page names 'localhost:3000' as where approval is sent."))
    
    async with testmu.step('whether a site navigation header is visible at the top of the page', instruction_id='c6cffef9-aeed-4432-8133-30ee5e5fc4b0'):
        set_var('site_navigation_header_visible', await testmu.vision_query(page, "whether a site navigation header is visible at the top of the page", ""))
    
    async with testmu.step('whether a footer is visible at the bottom of the page', instruction_id='ae34e364-b62a-4ed1-b18d-0f453e0191f1'):
        set_var('footer_visible', await testmu.vision_query(page, "whether a footer is visible at the bottom of the page", ""))
    
    async with testmu.step('Assertion check', instruction_id='12bdc0c5-d4be-4e3b-ad4f-b8329daf47f9'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "A page with the heading 'Allow Kane Test Client to use hearloop?' appears.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{allow_kane_test_client_heading_visible}}', 'store_key': 'allow_kane_test_client_heading_visible', 'variable_refs': {'{{allow_kane_test_client_heading_visible}}': 'true'}}, {'description': "The page names 'localhost:3000' as where approval is sent.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{localhost_3000_approval_destination_visible}}', 'store_key': 'localhost_3000_approval_destination_visible', 'variable_refs': {'{{localhost_3000_approval_destination_visible}}': 'true'}}, {'description': 'The page has no site navigation header.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{site_navigation_header_visible}}', 'store_key': 'site_navigation_header_visible', 'variable_refs': {'{{site_navigation_header_visible}}': 'false'}}, {'description': 'The page has no footer.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{footer_visible}}', 'store_key': 'footer_visible', 'variable_refs': {'{{footer_visible}}': 'false'}}], 'sub_checks': [{'description': "A page with the heading 'Allow Kane Test Client to use hearloop?' appears.", 'store_key': 'allow_kane_test_client_heading_visible', 'expected_value': 'true', 'extracted_value': '{{allow_kane_test_client_heading_visible}}', 'operator': 'equals', 'transforms': []}, {'description': "The page names 'localhost:3000' as where approval is sent.", 'store_key': 'localhost_3000_approval_destination_visible', 'expected_value': 'true', 'extracted_value': '{{localhost_3000_approval_destination_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'The page has no site navigation header.', 'store_key': 'site_navigation_header_visible', 'expected_value': 'false', 'extracted_value': '{{site_navigation_header_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'The page has no footer.', 'store_key': 'footer_visible', 'expected_value': 'false', 'extracted_value': '{{footer_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "A page with the heading 'Allow Kane Test Client to use hearloop?' appears, names 'localhost:3000' as where approval is sent, and has no site navigation header or footer."})
    
    async with testmu.step('Clicking Allow to grant permission', instruction_id='879224ea-0076-4bc3-88a2-40352ef3e365'):
        _loc_2 = page.locator("internal:role=button[name=\"Allow\"i]")
        
        await _loc_2.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the callback page to settle', instruction_id='6eb6cf2c-03f4-4243-972e-fca060a8a99f'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "a link labeled 'create a board of your own' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step("whether the page with the heading 'Allow Kane Test Client to use hearloop?' is present", instruction_id='f700bac3-0a92-4265-afa3-b54a7db956c8'):
        set_var('allow_authorization_page_visible', await testmu.vision_query(page, "whether the page with the heading 'Allow Kane Test Client to use hearloop?' is present", ""))
    
    async with testmu.step('Checking the address bar URL for the authorization code', instruction_id='3cbea971-9f99-4e59-887c-c84b73749e74'):
        set_var('address_bar_url_code', page.url)
    
    async with testmu.step('Assertion check', instruction_id='697fce7f-69e8-4893-aab2-2d1e4f9dfefb'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "The browser leaves the page with the heading 'Allow Kane Test Client to use hearloop?'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{allow_authorization_page_visible}}', 'store_key': 'allow_authorization_page_visible', 'variable_refs': {'{{allow_authorization_page_visible}}': 'false'}}, {'description': "The address bar URL now contains 'code='.", 'passed': True, 'operator': 'contains', 'transforms': [], 'json_path': None, 'expected': 'code=', 'extracted_value': '{{address_bar_url_code}}', 'store_key': 'address_bar_url_code', 'variable_refs': {'{{address_bar_url_code}}': 'http://localhost:3000/callback?code=kMGZSc4CiOaZEZ1r05JeG2eKJSYSy0ig&state=kane&iss=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth'}}], 'sub_checks': [{'description': "The browser leaves the page with the heading 'Allow Kane Test Client to use hearloop?'.", 'store_key': 'allow_authorization_page_visible', 'expected_value': 'false', 'extracted_value': '{{allow_authorization_page_visible}}', 'operator': 'equals', 'transforms': []}, {'description': "The address bar URL now contains 'code='.", 'store_key': 'address_bar_url_code', 'expected_value': 'code=', 'extracted_value': '{{address_bar_url_code}}', 'operator': 'contains', 'transforms': []}], 'composite_operator': 'and', 'claim': "The browser leaves that page and the address bar URL now contains 'code='."})


if __name__ == "__main__":
    testmu.run(test)