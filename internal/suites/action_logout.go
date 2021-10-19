package suites

import (
	"context"
	"fmt"
	"net/url"
	"testing"

	"github.com/go-rod/rod"
)

func (rs *RodSession) doLogout(t *testing.T, page *rod.Page) {
	rs.doNavigate(t, page, fmt.Sprintf("%s%s", GetLoginBaseURL(), "/logout"))
	rs.verifyIsFirstFactorPage(t, page)
}

func (wds *WebDriverSession) doLogout(ctx context.Context, t *testing.T) {
	wds.doVisit(t, fmt.Sprintf("%s%s", GetLoginBaseURL(), "/logout"))
	wds.verifyIsFirstFactorPage(ctx, t)
}

func (wds *WebDriverSession) doLogoutWithRedirect(ctx context.Context, t *testing.T, targetURL string, firstFactor bool) {
	wds.doVisit(t, fmt.Sprintf("%s%s%s", GetLoginBaseURL(), "/logout?rd=", url.QueryEscape(targetURL)))

	if firstFactor {
		wds.verifyIsFirstFactorPage(ctx, t)

		return
	}

	wds.verifyURLIs(ctx, t, targetURL)
}
