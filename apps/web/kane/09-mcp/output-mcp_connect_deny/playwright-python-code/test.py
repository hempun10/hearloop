import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="7e6b2c36-7bd9-4db8-b622-f267d4fd6a81",
    name="Deny Client Access in Hearloop",
    tc_id="TC-53",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"allow_kane_deny_client_heading_visible": "true", "url_contains_error_access_denied": "http://localhost:3000/callback?error=access_denied&error_description=User+denied+access&state=kane&iss=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth", "url_contains_code": "http://localhost:3000/callback?error=access_denied&error_description=User+denied+access&state=kane&iss=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth", "original_page_left": "false"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640391, "name": "mcp_authorize_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640392, "name": "mcp_deny_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.mcp_deny_url}}', instruction_id='078c0ef2-ef20-41c3-b449-832112d42aef'):
        variable_value_0 = var('{{global.mcp_deny_url}}')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the queued sign-in steps to complete', instruction_id='e7f534be-9c6a-418c-a03d-0d7fc809c0d4'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='4fbab8f1-b6f9-4121-ba0d-ec529891ce34'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='54ba6233-7e59-4987-af2e-0b819d7e0439'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Signing in with email and password', instruction_id='2e6dfabd-052e-4d65-a480-69a2e5c61b7f'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether the consent heading is present'):
        set_var('allow_kane_deny_client_heading_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).textContent.trim() === 'Allow Kane Deny Client to use hearloop?');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Allow Kane Deny Client to use"i]'], query="whether the heading 'Allow Kane Deny Client to use hearloop?' is present in the main page content", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the heading 'Allow Kane Deny Client to use hearloop?' appears"))
    
    async with testmu.step('Assertion check', instruction_id='76997b0e-6799-4c59-af47-e5e34dfde123'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the heading 'Allow Kane Deny Client to use hearloop?' appears", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{allow_kane_deny_client_heading_visible}}', 'store_key': 'allow_kane_deny_client_heading_visible', 'variable_refs': {'{{allow_kane_deny_client_heading_visible}}': 'true'}}], 'sub_checks': [{'description': "the heading 'Allow Kane Deny Client to use hearloop?' appears", 'store_key': 'allow_kane_deny_client_heading_visible', 'expected_value': 'true', 'extracted_value': '{{allow_kane_deny_client_heading_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the heading 'Allow Kane Deny Client to use hearloop?' appears"})
    
    async with testmu.step('Clicking Deny', instruction_id='95b4d9c6-7f34-49da-9242-12179f13cbb7'):
        _loc_2 = page.locator("internal:role=button[name=\"Deny\"i]")
        
        await _loc_2.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the callback page to load', instruction_id='46ed8b85-2a02-429c-8fc4-4ca3b32fbffe'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "a link labeled 'create a board of your own' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking the address bar URL for the access-denied error', instruction_id='f6ec1647-1f17-4c44-9996-c936c2d456b2'):
        set_var('url_contains_error_access_denied', page.url)
    
    async with testmu.step('Checking the address bar URL for an authorization code', instruction_id='24ea9335-58d0-42cc-8242-254d64179ad0'):
        set_var('url_contains_code', page.url)
    
    async with testmu.step('whether the original authorization approval page is visible in the browser', instruction_id='67f69896-40a4-4ebd-b61f-b595c844058f'):
        set_var('original_page_left', await testmu.vision_query(page, "whether the original authorization approval page is visible in the browser", ""))
    
    async with testmu.step('Assertion check', instruction_id='dc9465de-9bda-4b07-9152-daed3d16c473'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the browser leaves that page', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{original_page_left}}', 'store_key': 'original_page_left', 'variable_refs': {'{{original_page_left}}': 'false'}}, {'description': "the address bar URL contains 'error=access_denied'", 'passed': True, 'operator': 'contains', 'transforms': [], 'json_path': None, 'expected': 'error=access_denied', 'extracted_value': '{{url_contains_error_access_denied}}', 'store_key': 'url_contains_error_access_denied', 'variable_refs': {'{{url_contains_error_access_denied}}': 'http://localhost:3000/callback?error=access_denied&error_description=User+denied+access&state=kane&iss=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth'}}, {'description': "the address bar URL does not contain 'code='", 'passed': True, 'operator': 'not_contains', 'transforms': [], 'json_path': None, 'expected': 'code=', 'extracted_value': '{{url_contains_code}}', 'store_key': 'url_contains_code', 'variable_refs': {'{{url_contains_code}}': 'http://localhost:3000/callback?error=access_denied&error_description=User+denied+access&state=kane&iss=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth'}}], 'sub_checks': [{'description': 'the browser leaves that page', 'store_key': 'original_page_left', 'expected_value': 'false', 'extracted_value': '{{original_page_left}}', 'operator': 'equals', 'transforms': []}, {'description': "the address bar URL contains 'error=access_denied'", 'store_key': 'url_contains_error_access_denied', 'expected_value': 'error=access_denied', 'extracted_value': '{{url_contains_error_access_denied}}', 'operator': 'contains', 'transforms': []}, {'description': "the address bar URL does not contain 'code='", 'store_key': 'url_contains_code', 'expected_value': 'code=', 'extracted_value': '{{url_contains_code}}', 'operator': 'not_contains', 'transforms': []}], 'composite_operator': 'and', 'claim': "the browser leaves that page and the address bar URL contains 'error=access_denied' and does not contain 'code='"})


if __name__ == "__main__":
    testmu.run(test)